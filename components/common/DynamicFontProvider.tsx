
import { getContent } from "@/app/actions/common";

export async function DynamicFontProvider() {
  const content = await getContent();
  const fontUrl = content['font_google_link'];
  const fontFamily = content['font_family_name'];

  if (!fontUrl || !fontFamily) return null;

  return (
    <>
       <link href={fontUrl} rel="stylesheet" />
       <style>{`
          :root {
            --font-body: '${fontFamily}', var(--font-syne), sans-serif;
            --font-display: '${fontFamily}', var(--font-syne), serif;
            --font-heading: '${fontFamily}', var(--font-syne), sans-serif;
          }
       `}</style>
    </>
  );
}
