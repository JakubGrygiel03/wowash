import { ReviewReel } from "@/components/home/review-reel";
import { reviewsSummary } from "@/lib/reviews";

export function Reviews() {
  return (
    <section id="opinie" className="bg-white">
      <div className="brand-line h-0.5" aria-hidden />
      <div className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-6 lg:py-14">
        <p className="eyebrow">Opinie</p>
        <h2 className="mt-2 max-w-3xl text-[1.7rem] leading-tight lg:text-[2rem]">
          Klienci po myciu i malowaniu
        </h2>
        <p className="mt-3 text-sm text-muted lg:text-base">
          <span className="font-semibold text-[#071428]">
            {reviewsSummary.ratingValue} na 5
          </span>{" "}
          · {reviewsSummary.count} opinii w {reviewsSummary.source}. Każda zostaje chwilę, potem wchodzi kolejna.
        </p>
        <ReviewReel />
        <a
          href={reviewsSummary.href}
          className="mx-auto mt-4 flex min-h-11 w-fit items-center text-sm font-semibold text-[#1e3a8a] underline-offset-4 hover:underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          Wszystkie opinie w Google
        </a>
      </div>
    </section>
  );
}
