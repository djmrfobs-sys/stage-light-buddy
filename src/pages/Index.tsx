import { useState, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import PackageCards from "@/components/PackageCards";
import CalculatorForm, { type CalcResult } from "@/components/CalculatorForm";
import ResultSection from "@/components/ResultSection";
import CustomResult from "@/components/CustomResult";
import RequestForm from "@/components/RequestForm";
import InfoBlocks from "@/components/InfoBlocks";
import FAQSection from "@/components/FAQSection";
import SpecialEffects from "@/components/SpecialEffects";
import FinalCTA from "@/components/FinalCTA";
import Navbar from "@/components/Navbar";

type View = "idle" | "result" | "custom";

const Index = () => {
  const [view, setView] = useState<View>("idle");
  const [result, setResult] = useState<CalcResult | null>(null);
  const calcRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<HTMLDivElement>(null);

  const scrollToCalc = () => {
    setView("idle");
    setResult(null);
    setTimeout(() => {
      calcRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const scrollToRequest = () => {
    requestRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleResult = (res: CalcResult) => {
    setResult(res);
    setView("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCustom = () => {
    setView("custom");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setView("idle");
    setResult(null);
    setTimeout(() => {
      calcRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen pt-14">
      <Navbar />
      {view === "idle" && (
        <>
          <HeroSection onCalculate={scrollToCalc} />
          <PackageCards />
          <div ref={calcRef}>
            <CalculatorForm onResult={handleResult} onCustom={handleCustom} />
          </div>
          <div ref={requestRef}>
            <RequestForm />
          </div>
          <SpecialEffects />
          <InfoBlocks />
          <FAQSection />
          <FinalCTA onCalculate={scrollToCalc} />
        </>
      )}

      {view === "result" && result && (
        <>
          <ResultSection
            result={result}
            onReset={handleReset}
            onRequest={scrollToRequest}
          />
          <div ref={requestRef}>
            <RequestForm />
          </div>
        </>
      )}

      {view === "custom" && <CustomResult onReset={handleReset} />}

      <footer className="border-t border-border/50 py-8">
        <div className="container px-4 text-center text-muted-foreground text-sm">
          © 2026 ANGAR. Все права защищены.
        </div>
      </footer>
    </div>
  );
};

export default Index;
