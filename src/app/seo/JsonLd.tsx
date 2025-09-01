"use client";

export default function JsonLd<T>({ data }: { data: T }) {
  return (
    <script
      type="application/ld+json"
      // stringify propre pour éviter XSS
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
