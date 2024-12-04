"use client"

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const news = [
    { title: "Novo fundo de tecnologia lançado", content: "Um novo fundo focado em empresas de tecnologia foi lançado hoje, oferecendo oportunidades de investimento em startups promissoras." },
    { title: "Mercado reage positivamente a dados econômicos", content: "Os principais índices subiram após a divulgação de dados econômicos positivos, indicando uma recuperação robusta da economia." },
    { title: "Regulamentação de criptomoedas em pauta", content: "O governo anunciou planos para discutir novas regulamentações para o mercado de criptomoedas, visando maior segurança para investidores." },
];

export function NewsCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + news.length) % news.length);
    };

    return (
        <div className="relative">
            <div className="overflow-hidden h-48">
                <div className="transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {news.map((item, index) => (
                        <div key={index} className="absolute w-full h-full">
                            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.content}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Button variant="outline" size="icon" className="absolute top-1/2 left-0 transform -translate-y-1/2" onClick={prevSlide}>
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="absolute top-1/2 right-0 transform -translate-y-1/2" onClick={nextSlide}>
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}

