import { CreditCard, Captions, Mic } from "lucide-react";

export const FeatureSection = () => {
    const features = [
        {
            icon: CreditCard,
            title: "Free",
            description: "The live stream is completely free and priceless",
            iconStyle: "rotate-[-12deg]"
        },
        {
            icon: Captions,
            title: "Subtitles",
            description: "Here you can watch all series and movies with AI subtitles",
            iconStyle: ""
        },
        {
            icon: Mic,
            title: "Dubbed",
            description: "Here you can watch all series and movies with AI Dubbed",
            iconStyle: ""
        }
    ];

    return (
        <div className="w-full bg-background py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Whats different?
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Since 2013, we've had more than 9,000,000,000 <br />
                        viewers on CINESTREAM live TV.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-[#121212] rounded-[2rem] p-12 text-center group hover:bg-[#1A1A1A] transition-colors border border-white/5 relative overflow-hidden"
                        >
                            {/* Grid Background Effect */}
                            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />

                            <div className="relative z-10 flex flex-col items-center gap-6">
                                <div className="w-20 h-20 bg-[#6B5D36]/20 rounded-2xl flex items-center justify-center mb-4">
                                    <feature.icon
                                        size={40}
                                        className={`text-primary ${feature.iconStyle}`}
                                    />
                                </div>

                                <h3 className="text-2xl font-bold">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
