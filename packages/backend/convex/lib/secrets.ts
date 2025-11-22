import {
  CreateSecretCommand,
  GetSecretValueCommand,
  GetSecretValueCommandOutput,
  PutSecretValueCommand,
  ResourceExistsException,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";

export function createSecretsManagerClient(): SecretsManagerClient {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!accessKeyId || !secretAccessKey) {
    throw new Error("AWS credentials not found in environment variables");
  }

  return new SecretsManagerClient({
    region: process.env.AWS_REGION,
    credentials: { accessKeyId, secretAccessKey },
  });
}

export async function getSecretValue(
  secretName: string
): Promise<GetSecretValueCommandOutput> {
  const client = createSecretsManagerClient();

  return await client.send(new GetSecretValueCommand({ SecretId: secretName }));
}

export async function upsertSecret(
  secretName: string,
  secretValue: Record<string, unknown>
): Promise<void> {
  const client = createSecretsManagerClient();

  try {
    await client.send(
      new CreateSecretCommand({
        Name: secretName,
        SecretString: JSON.stringify(secretValue),
      })
    );
  } catch (error) {
    if (error instanceof ResourceExistsException) {
      await client.send(
        new PutSecretValueCommand({
          SecretId: secretName,
          SecretString: JSON.stringify(secretValue),
        })
      );
    } else {
      throw error;
    }
  }
}

export function parseSecretString<T = Record<string, unknown>>(
  secret: GetSecretValueCommandOutput,
  validate?: (value: unknown) => value is T
): T | null {
  if (!secret.SecretString) return null;

  try {
    const parsed = JSON.parse(secret.SecretString);
    if (validate && !validate(parsed)) {
      return null;
    }
    return parsed as T;
  } catch {
    return null;
  }
}
