import { vapiSecretsAtom, widgetSettingsAtom } from "@/modules/lib/atoms";
import Vapi from "@vapi-ai/web";
import { useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";

interface TranscriptMessage {
  role: "user" | "assistant";
  text: string;
}

export const useVapi = () => {
  const vapiSecrets = useAtomValue(vapiSecretsAtom);
  const widgetSettings = useAtomValue(widgetSettingsAtom);

  const vapiRef = useRef<Vapi | null>(null);

  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);

  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (!vapiSecrets) return;

    const vapiInstance = new Vapi(vapiSecrets.publicApiKey);
    vapiRef.current = vapiInstance;

    vapiInstance.on("call-start", () => {
      setIsConnected(true);
      setIsConnecting(false);
      setTranscript([]);
    });

    vapiInstance.on("call-end", () => {
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
    });

    vapiInstance.on("speech-start", () => {
      setIsSpeaking(true);
    });

    vapiInstance.on("speech-end", () => {
      setIsSpeaking(false);
    });

    vapiInstance.on("error", (e) => {
      console.log("❌ [VAPI ERROR]:", e);
      setIsConnecting(false);
      setIsConnected(false);
      setIsSpeaking(false);
    });

    vapiInstance.on("message", (message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setTranscript((prev) => [
          ...prev,
          {
            role: message.role === "user" ? "user" : "assistant",
            text: message.transcript,
          },
        ]);
      }
    });

    return () => {
      vapiInstance?.stop();
    };
  }, [vapiSecrets]);

  const startCall = () => {
    if (!vapiSecrets || !widgetSettings?.vapiSettings?.assistantId) return;
    setIsConnecting(true);

    if (vapiRef.current) {
      vapiRef.current.start(widgetSettings.vapiSettings.assistantId);
    }
  };

  const endCall = () => {
    if (vapiRef.current) {
      vapiRef.current.stop();
    }
  };

  return {
    transcript,
    isConnected,
    isConnecting,
    isSpeaking,
    startCall,
    endCall,
  };
};
