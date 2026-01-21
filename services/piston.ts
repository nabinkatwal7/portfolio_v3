
export type PistonLanguage = {
  language: string;
  version: string;
  aliases: string[];
};

export type PistonExecutionResult = {
  run: {
    stdout: string;
    stderr: string;
    output: string;
    code: number;
    signal: string | null;
  };
  language: string;
  version: string;
};

const PISTON_API_URL = "https://emkc.org/api/v2/piston";

export async function getSupportedLanguages(): Promise<PistonLanguage[]> {
  const response = await fetch(`${PISTON_API_URL}/runtimes`);
  if (!response.ok) {
    throw new Error("Failed to fetch languages");
  }
  return response.json();
}

export async function executeCode(
  language: string,
  version: string,
  code: string
): Promise<PistonExecutionResult> {
  const response = await fetch(`${PISTON_API_URL}/execute`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      language,
      version,
      files: [
        {
          content: code,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to execute code");
  }

  return response.json();
}
