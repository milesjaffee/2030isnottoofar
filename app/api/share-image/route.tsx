import { supabase } from "@/lib/supabase";
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

const roundUpToNearestPowerOf10 = (n: number) => {
  if (n <= 0) {
    return 1; // Returns 1 for non-positive numbers (or adjust as needed)
  }
  // Calculate the base-10 logarithm, round up the exponent, and use it as the new power
  let exponent = Math.ceil(Math.log10(n));
  return Math.pow(10, exponent);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id") ?? "482";


  const { data, error } = await supabase
      .from("messages")
      .select("country, verified_at")
      .eq("id", id)
      .single();


    const rank: string = id;
    const country: string =  data?.country! || "US"; 
    const timestamp =  data?.verified_at! || "null";

  return new ImageResponse( 
    ( 
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: (parseInt(rank) < 100000)? "20px" : "0px",
        //paddingTop: (parseInt(rank) < 100000)? "130px" : "0px",

        backgroundImage: (parseInt(rank) < 1000)? "linear-gradient(120deg, #eea000, #eec646)":
                        (parseInt(rank) < 10000)? "linear-gradient(130deg, #aaaeee, #dddeeb)":
                        (parseInt(rank) < 100000)? "linear-gradient(150deg, #fe8025, #de6000)":
                        "linear-gradient(90deg, #db2777, #2564eb)"
        
      }}>

        <div style={{
          fontSize: 65,
          color: "white",
          padding: "20px",
          alignContent: "center",
          textAlign: "center",
          justifySelf: "center",
          width: "100%",
          display: "flex",
        }}>
          FIRST {roundUpToNearestPowerOf10(parseInt(rank)).toLocaleString()} MESSAGES

        </div>
        <div style={{
            backgroundImage: "linear-gradient(76deg, #db2777, #2564eb)",
            color: "white",
            width: "100%",
            height: "90%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "20px",
            fontSize: 55,
            fontFamily: "Verdana",
          }}
        >
            <p style={{ fontSize: 90, fontWeight: "bold" }}>
              2030 is not too far.
            </p>

            <div style={{ marginTop: 40, display: "flex" }}>
              I am the {formatOrdinals(rank)} person to send a message to my future self.</div>

            <div style={{ marginTop: 40, display: "flex" }}>
              Sent from: {country +" "+ getFlagEmoji(country)} | Verified: {timestamp}
            </div>

            <em style={{ marginTop: 40, color: "#ddd"}}>
              Send your own message: 2030.milesj.org
            </em>
          </div>
        </div>
    ),
    
    {
      width: 1200,
      height: 1200,
    }
  );
    
}