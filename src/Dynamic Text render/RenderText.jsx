import React from "react";

const DynamicTextRenderer = ({ response }) => {
  // Split the response by newline (\n)
  const lines = response.split("\n");

  return (
    <div
      style={{
        padding: "20px",
        lineHeight: "1.6",
        fontFamily: "Arial, sans-serif",
      }}
    >
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
          <p key={index} style={{ margin: "0" }}>
            {parsedLine}
          </p>
        );
      })}
    </div>
  );
};

export default DynamicTextRenderer;
