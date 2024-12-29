import React from "react";

const DynamicTextRenderer = ({ response }) => {
  // Split the response by newline (\n)
  const lines = response.split("\n");

  const downloadText = (e) => {
    e.preventDefault();

    const filename = "Chat.txt";

    // Join the lines into a plain text string
    const plainTextContent = lines.join("\n");

    const blob = new Blob([plainTextContent], { type: "text/plain" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = filename;

    document.body.appendChild(link); // Append to the document so it can be clicked

    link.click(); // Programmatically click the link

    document.body.removeChild(link); // Remove the link after download

    URL.revokeObjectURL(url); // Clean up the URL object
  };

  return (
    <div
      style={{
        // padding: "20px",
        lineHeight: "1.6",
        fontFamily: "Arial, sans-serif",
      }}
      className="relative"
    >
      <button
        onClick={downloadText}
        className="flex flex-row items-center gap-x-1 text-xs border-[1px] p-[1px] px-2 rounded-sm absolute top-1 right-1 bg-zinc-100"
      >
        <span>Download</span>
        <img src="/downloadEmoji.png" className="size-3" alt="⬇️" />
      </button>
      <img
        src="/chat-bot.png"
        alt="Tania Andrew"
        className="relative inline-block h-[20px] w-[20px] !rounded-full  object-cover object-center"
      />
      {lines.map((line, index) => {
        // Check if the line is bold (**bold text**) and wrap it in <strong>
        const parsedLine = line.split(/(\*\*.*?\*\*)/g).map((part, i) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={i}>{part.replace(/\*\*/g, "")}</strong>;
          }
          return part;
        });

        // Render each line as a paragraph (<p>)
        return (
          <p key={index} style={{ margin: "0" }} className="md:px-4 px-2 py-2">
            {parsedLine}
          </p>
        );
      })}
    </div>
  );
};

export default DynamicTextRenderer;
