import { Linkedin } from "lucide-react";

const creators = [
  { name: "Egwuchika", linkedin: "https://www.linkedin.com/in/tochukwu-egwuchika-8a398720a/" },
  { name: "Johnnie", linkedin: "https://www.linkedin.com/in/johnnie-chukwudi-6b5988246/" },
];

export const Footer = () => {
  return (
    <footer className="py-6 px-4 border-t border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-muted-foreground">
        <span>Made by</span>
        <div className="flex items-center gap-3">
          {creators.map((creator, index) => (
            <span key={creator.name} className="flex items-center gap-1">
              <a
                href={creator.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-foreground hover:text-primary transition-colors"
              >
                {creator.name}
                <Linkedin className="w-4 h-4" />
              </a>
              {index < creators.length - 1 && <span className="text-muted-foreground mx-1">&</span>}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};
