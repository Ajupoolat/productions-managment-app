interface SignatureCardProps {
  signature?: string;
}

export function SignatureCard({
  signature,
}: SignatureCardProps) {
  return (
    <div className="glass-panel p-6 rounded-xl">

      <h2 className="text-sm font-semibold mb-3">
        Electronic Signature
      </h2>

      <div className="p-4 bg-slate-800 rounded-lg text-center">

        <p className="font-serif text-xl italic text-slate-300">
          {signature}
        </p>

        <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-wider">
          Signed electronically
        </p>

      </div>
    </div>
  );
}