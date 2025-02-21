"use client";

import { AlertTriangleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-blue-900 text-white flex flex-col items-center justify-center gap-10 shadow-lg">
            <div className="pt-12 text-center">
                <h5 className="text-xl font-bold">Prisma Prime Invest</h5>
                <p className="text-blue-200 text-sm mt-4">
                    Transformando o futuro dos investimentos através da inteligência artificial e análise preditiva
                    avançada.
                </p>
            </div>
  
            <div className="bg-blue-800/50 mx-16 rounded-lg p-6 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                    <AlertTriangleIcon className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <div className="space-y-2">
                        <h4 className="font-medium text-white">Aviso Legal Importante</h4>
                        <p className="text-sm text-blue-200 leading-relaxed">
                            A Plataforma Prisma Prime Invest tem caráter exclusivamente informativo e educativo. O conteúdo
                            disponibilizado não deve ser interpretado como recomendação ou indicação de investimento,
                            consultoria financeira ou qualquer tipo de assessoria para compra ou venda de ativos. As
                            análises e projeções apresentadas são baseadas em dados históricos e não garantem resultados
                            futuros. Para decisões de investimento, consulte sempre um profissional qualificado que possa
                            avaliar seu perfil de investidor e objetivos específicos. Investimentos envolvem riscos e podem
                            resultar em perdas patrimoniais.
                        </p>
                    </div>
                </div>
            </div>
  
            <div className="flex justify-center flex-wrap gap-4 text-sm text-blue-200">
                <Link href="#" className="hover:text-white transition-colors underline">
                    Termos de Uso
                </Link>
                <span className="text-blue-700">•</span>
                <Link href="#" className="hover:text-white transition-colors underline">
                    Política de Privacidade
                </Link>
                <span className="text-blue-700">•</span>
                <Link href="#" className="hover:text-white transition-colors underline">
                    Cookies
                </Link>
            </div>

            <div className="border-t border-blue-500 w-full">
                <p className="text-sm text-center p-4">
                    © {new Date().getFullYear()} Prisma Prime Invest. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
