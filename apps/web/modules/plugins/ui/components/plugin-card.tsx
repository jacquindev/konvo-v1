"use client";

import { Button } from "@repo/ui/components/ui/button";
import { Spinner } from "@repo/ui/components/ui/spinner";
import { cn } from "@repo/ui/lib/utils";
import { ArrowLeftRightIcon, LucideIcon, ZapIcon } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

export interface PluginFeature {
  icon: LucideIcon;
  label: string;
  description: string;
}

interface PluginCardProps {
  serviceName: string;
  serviceImage: string;
  serviceImageClassName?: string;
  features: PluginFeature[];
  disabled?: boolean;
  onSubmit: () => void;
}

export const PluginCard = ({
  serviceName,
  serviceImage,
  serviceImageClassName,
  features,
  disabled,
  onSubmit,
}: PluginCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="h-fit w-full rounded-lg border bg-muted/50 p-8 shadow-sm space-y-8"
    >
      {/* Logo Row */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.12 },
          },
        }}
        className="flex items-center justify-center gap-6"
      >
        {/* Left Logo */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1 },
          }}
          className="flex flex-col items-center size-12 relative"
        >
          <Image
            alt={serviceName}
            src={serviceImage}
            width={40}
            height={40}
            className={cn(
              "rounded object-contain size-full drop-shadow-md bg-background",
              serviceImageClassName
            )}
          />
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          className="flex flex-col items-center min-w-0"
        >
          <ArrowLeftRightIcon className="text-muted-foreground" />
        </motion.div>

        {/* Konvo Logo */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1 },
          }}
          className="flex flex-col items-center size-12 relative"
        >
          <Image
            alt="Konvo"
            src="/logo.png"
            width={40}
            height={40}
            className="rounded object-contain dark:invert bg-background size-full drop-shadow-md"
          />
        </motion.div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="text-center"
      >
        <p className="text-2xl font-semibold">
          Connect your {serviceName} account
        </p>
      </motion.div>

      {/* Features */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.08 },
          },
        }}
      >
        <div className="space-y-5">
          {features.map((feature) => (
            <motion.div
              key={feature.label}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.22 }}
              className="flex items-center gap-3"
            >
              <div className="flex size-10 items-center justify-center rounded-lg border bg-muted shadow-sm">
                <feature.icon className="size-5 text-primary drop-shadow-xs" />
              </div>
              <div>
                <p className="font-medium text-base">{feature.label}</p>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Button */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <motion.div whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.02 }}>
          <Button
            className="w-full transition-all duration-200"
            disabled={disabled}
            onClick={onSubmit}
            variant="default"
            size="lg"
          >
            {disabled ? (
              <>
                <Spinner className="size-4 shrink-0" />
                Loading...
              </>
            ) : (
              <>
                <ZapIcon className="size-4 shrink-0" />
                Connect
              </>
            )}
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
