import {
  contentHashFromArrayBuffer,
  guessMimeTypeFromContents,
  guessMimeTypeFromExtension,
  vEntryId,
} from "@convex-dev/rag";
import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";
import type { Id } from "../_generated/dataModel";
import {
  convertEntryToPublicFile,
  type EntryMetadata,
} from "../lib/convertEntryToPublicFile";
import { extractTextContent } from "../lib/extractTextContent";
import {
  privateAction,
  privateMutation,
  privateQuery,
} from "../lib/privateUtils";
import rag from "../system/ai/rag";

export const addFile = privateAction({
  args: {
    filename: v.string(),
    mimeType: v.string(),
    bytes: v.bytes(),
    category: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const { bytes, filename, category, mimeType } = args;

    const fileType =
      mimeType ||
      guessMimeTypeFromContents(bytes) ||
      guessMimeTypeFromExtension(filename);

    const blob = new Blob([bytes], { type: fileType });

    const storageId = await ctx.storage.store(blob);

    const text = await extractTextContent(ctx, {
      storageId,
      filename,
      bytes,
      mimeType,
    });

    const { entryId, created } = await rag.add(ctx, {
      namespace: ctx.orgId,
      text,
      key: filename,
      title: filename,
      metadata: {
        storageId,
        uploadedBy: ctx.orgId,
        filename,
        category: category ?? null,
      } as EntryMetadata,
      contentHash: await contentHashFromArrayBuffer(bytes), // To avoid re-inserting if the file content hasn't changed
    });

    if (!created) {
      console.debug("Entry already exists, skipping upload metadata");
      await ctx.storage.delete(storageId);
    }

    return {
      url: await ctx.storage.getUrl(storageId),
      entryId,
    };
  },
});

export const deleteFile = privateMutation({
  args: {
    entryId: vEntryId,
  },
  async handler(ctx, args) {
    const namespace = await rag.getNamespace(ctx, { namespace: ctx.orgId });

    if (!namespace) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid namespace",
      });
    }

    const entry = await rag.getEntry(ctx, { entryId: args.entryId });

    if (!entry) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Entry not found",
      });
    }

    if (entry.metadata?.uploadedBy !== ctx.orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid organization ID",
      });
    }

    if (entry.metadata?.storageId) {
      await ctx.storage.delete(entry.metadata.storageId as Id<"_storage">);
    }

    await rag.deleteAsync(ctx, { entryId: args.entryId });
  },
});

export const list = privateQuery({
  args: {
    category: v.optional(v.string()),
    paginationOpts: paginationOptsValidator,
  },
  async handler(ctx, args) {
    const namespace = await rag.getNamespace(ctx, { namespace: ctx.orgId });

    if (!namespace) {
      return { page: [], isDone: true, continueCursor: "" };
    }

    const results = await rag.list(ctx, {
      namespaceId: namespace.namespaceId,
      paginationOpts: args.paginationOpts,
    });

    const files = await Promise.all(
      results.page.map((entry) => convertEntryToPublicFile(ctx, entry))
    );

    const filteredFiles = args.category
      ? files.filter((file) => file.category === args.category)
      : files;

    return {
      page: filteredFiles,
      isDone: results.isDone,
      continueCursor: results.continueCursor,
    };
  },
});
