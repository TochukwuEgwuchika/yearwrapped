import { Linkedin, Twitter, Facebook } from “lucide-react”;

const creators = [
{
name: “Egwuchika”,
linkedin: “https://www.linkedin.com/in/tochukwu-egwuchika-8a398720a/”,
twitter: “https://x.com/tochi_egwuchika?s=21”,
facebook: “https://www.facebook.com/share/17f8M8kA4A/?mibextid=wwXIfr”
},
{
name: “Johnnie”,
linkedin: “https://www.linkedin.com/in/johnnie-chukwudi-6b5988246/”
},
];

export const Footer = () => {
return (
<footer className="py-6 px-4 border-t border-border/50 bg-background/80 backdrop-blur-sm">
<div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
<span>Made by</span>
<div className="flex flex-col sm:flex-row items-center gap-4">
{creators.map((creator, index) => (
<span key={creator.name} className="flex items-center gap-2">
<span className="text-foreground font-medium">{creator.name}</span>
<div className="flex items-center gap-1.5">
<a
href={creator.linkedin}
target=”_blank”
rel=“noopener noreferrer”
className=“text-muted-foreground hover:text-primary transition-colors”
aria-label={`${creator.name}'s LinkedIn`}
>
<Linkedin className="w-4 h-4" />
</a>
{creator.twitter && (
<a
href={creator.twitter}
target=”_blank”
rel=“noopener noreferrer”
className=“text-muted-foreground hover:text-primary transition-colors”
aria-label={`${creator.name}'s Twitter`}
>
<Twitter className="w-4 h-4" />
</a>
)}
{creator.facebook && (
<a
href={creator.facebook}
target=”_blank”
rel=“noopener noreferrer”
className=“text-muted-foreground hover:text-primary transition-colors”
aria-label={`${creator.name}'s Facebook`}
>
<Facebook className="w-4 h-4" />
</a>
)}
</div>
{index < creators.length - 1 && <span className="hidden sm:inline text-muted-foreground mx-1">&</span>}
</span>
))}
</div>
</div>
</footer>
);
};
