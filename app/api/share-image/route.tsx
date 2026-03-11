import { ImageResponse } from "next/og";

export const contentType = "image/png";
export const runtime = "edge";

const enOrdinalRules = new Intl.PluralRules("en-US", { type: "ordinal" });

const suffixes = new Map([
  ["one", "st"],
  ["two", "nd"],
  ["few", "rd"],
  ["other", "th"],
]);
const formatOrdinals = (str: string) => {
  const n = parseInt(str);
  const rule = enOrdinalRules.select(n);
  const suffix = suffixes.get(rule);
  return `${n}${suffix}`;
};

const getFlagEmoji = (countryCode: string) => {
  if (!countryCode || countryCode.length !== 2) {
    return '🏳️'; // Return a default flag or handle the error as needed
  }
  
  // The offset for the regional indicator symbol 'A' (🇦) is 127462
  // 'A'.charCodeAt(0) is 65
  // 127462 - 65 = 127397 (the magic number)
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
    
  return String.fromCodePoint(...codePoints);
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const rank = searchParams.get("rank") ?? "482";
  const country = searchParams.get("country") ?? "unknown";
  const timestamp = searchParams.get("time") ?? "unknown";

  return new ImageResponse( 
    ( 
      <div style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: (parseInt(rank) < 100000)? "20px" : "0px",
        paddingTop: (parseInt(rank) < 100000)? "130px" : "0px",

        
        
      }}>
        <div style={{
            backgroundImage: "linear-gradient(76deg, #db2777, #2564eb)",
            color: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "20px",
            fontSize: 55,
            fontFamily: "sans-serif",
          }}
        >
            <p style={{ fontSize: 90, fontWeight: "bold" }}>
              2030 is not too far.
            </p>

            <div style={{ marginTop: 40, display: "flex" }}>
              I am the {formatOrdinals(rank)} person to send a message to my future self.</div>

            <div style={{ marginTop: 40, fontSize: 32, display: "flex" }}>
              Sent from: {country +" "+ getFlagEmoji(country)} | Verified: {timestamp}
            </div>

            <div style={{ marginTop: 40, fontSize: 28, color: "#aaa" }}>
              2030isnottoofar.com
            </div>
          </div>
        </div>
    ),
    
    {
      width: 1200,
      height: 1200
    }
  );
    
}