import { useEffect, useState } from "react";
import { toast } from "sonner";

export const usePluginData = <T>(
  action: () => Promise<T>,
  errorMessage: string
) => {
  const [data, setData] = useState<T>([] as T);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await action();
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (error) {
        if (isMounted) {
          setError(error as Error);
          toast.error(errorMessage);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [action, errorMessage]);

  return { data, isLoading, error };
};
