// import Image from "next/image";

export default function LogoCarbonUturnImg({ className = "", style = {} }) {
  return (
    <span className={`inline-flex items-center ${className}`} style={style}>
      {/* <Image
        width={40}
        height={40}
        src={CUTLogo.src}
        alt="Carbon UTurn Logo"
        className="h-10 mr-2"
      /> */}
      <span className="font-sans font-semibold text-2xl tracking-wide text-gray-700 dark:text-gray-300">
        carbon
      </span>
      <span className="font-sans font-semibold text-2xl tracking-wide ml-1 text-primary-600 dark:text-primary-400">
        Uturn
      </span>
    </span>
  );
}
