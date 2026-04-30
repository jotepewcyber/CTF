// // // 'use client';
// // // import { Tree } from "@/components/Learn/Tree";

// // // export default function page() {
// // //   return (
// // //    <>
// // //       <Tree />
// // //     </>
// // //   )
// // // }

// // 'use client';

// // import { Tree } from "@/components/Learn/Tree";

// // export default function Page() {
// //   return (
// //     <div className="flex h-screen bg-[#0a0d0f] text-[#c8d6e5] overflow-hidden">

// //       {/* ── LEFT SIDEBAR ── */}
// //       <aside className="w-[28%] min-w-[200px] max-w-[280px] bg-[#0f1419] border-r border-[#1e2d3d] flex flex-col overflow-hidden">
// //         <div className="px-4 py-3 bg-[#141c24] border-b border-[#1e2d3d] shrink-0">
// //           <p className="font-mono text-[11px] tracking-widest text-[#00ff88] mb-1">
// //             CTF<span className="text-[#ff4757]">://</span>ATTACKS
// //           </p>
// //           <p className="font-mono text-[10px] text-[#57606f]">// select a category</p>
// //         </div>
// //         <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#1e2d3d]">
// //           <Tree />
// //         </div>
// //       </aside>

// //       {/* ── MAIN CONTENT ── */}
// //       <main className="flex-1 flex flex-col overflow-hidden">

// //         {/* Top bar */}
// //         <div className="flex items-center gap-3 px-6 py-3 bg-[#141c24] border-b border-[#1e2d3d] shrink-0">
// //           <span className="font-mono text-[11px] text-[#57606f]">
// //             root@ctf:<span className="text-[#00ff88]">~/home</span>
// //           </span>
// //           <span className="ml-auto font-mono text-[11px] bg-[#00ccff]/10 text-[#00ccff] border border-[#00ccff]/25 px-3 py-0.5 rounded animate-pulse">
// //             READY
// //           </span>
// //         </div>

// //         {/* Scrollable body */}
// //         <div className="flex-1 overflow-y-auto px-8 py-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#1e2d3d]">

// //           {/* Hero */}
// //           <p className="font-mono text-[11px] tracking-[3px] text-[#00ff88] mb-3">
// //             // CAPTURE THE FLAG
// //           </p>
// //           <h1 className="text-4xl font-bold text-white leading-tight mb-3">
// //             Learn <span className="text-[#00ff88]">Hacking</span>
// //             <br />Interactively
// //           </h1>
// //           <p className="text-[15px] text-[#57606f] leading-relaxed max-w-xl mb-7">
// //             CTF (Capture The Flag) is a cybersecurity competition format where participants
// //             solve security challenges across web exploitation, cryptography, reverse
// //             engineering, and more — to find hidden <span className="text-[#00ff88] font-mono">flags</span>.
// //             Click any category on the left to explore attacks and techniques.
// //           </p>

// //           {/* CTA buttons */}
// //           <div className="flex gap-3 flex-wrap mb-8">
// //             <button className="px-5 py-2 rounded-md bg-[#00ff88] text-[#0a0d0f] text-sm font-bold tracking-wide hover:opacity-85 transition-opacity">
// //               Start Learning
// //             </button>
// //             <button className="px-5 py-2 rounded-md border border-[#00ccff] text-[#00ccff] text-sm font-semibold hover:bg-[#00ccff]/10 transition-colors">
// //               View Challenges
// //             </button>
// //           </div>

// //           {/* Stat cards */}
// //           <div className="grid grid-cols-3 gap-3 max-w-md mb-8">
// //             {[
// //               { label: "CATEGORIES",   value: "08", color: "text-[#00ff88]" },
// //               { label: "ATTACK TYPES", value: "24+", color: "text-[#00ccff]" },
// //               { label: "DIFFICULTY",   value: "HARD", color: "text-[#ff4757]" },
// //             ].map(({ label, value, color }) => (
// //               <div key={label} className="bg-[#141c24] border border-[#1e2d3d] rounded-lg p-4">
// //                 <p className="font-mono text-[10px] text-[#57606f] tracking-wider mb-1">{label}</p>
// //                 <p className={`text-2xl font-bold ${color}`}>{value}</p>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Category cards */}
// //           <p className="font-mono text-[11px] tracking-[2px] text-[#57606f] mb-4">// CATEGORIES</p>
// //           <div className="grid grid-cols-2 gap-3 max-w-2xl mb-8">
// //             {[
// //               { icon: "◉", label: "Web Exploitation",    desc: "SQLi, XSS, CSRF, IDOR",             color: "text-[#00ff88]", badge: "HOT" },
// //               { icon: "◈", label: "Forensics",           desc: "Steganography, PCAP, Memory",        color: "text-[#00ccff]" },
// //               { icon: "⬡", label: "Cryptography",        desc: "RSA, AES, Hash Cracking",            color: "text-[#ff4757]" },
// //               { icon: "◆", label: "Pwn / Binary",        desc: "Buffer Overflow, ROP, Format String", color: "text-[#00ff88]" },
// //               { icon: "↩", label: "Reverse Engineering", desc: "Ghidra, GDB, Anti-Debug",            color: "text-[#00ccff]" },
// //               { icon: "◇", label: "Misc / OSINT",        desc: "Metadata, Jail Escape, Coding",      color: "text-[#ff4757]" },
// //             ].map(({ icon, label, desc, color, badge }) => (
// //               <div
// //                 key={label}
// //                 className="bg-[#141c24] border border-[#1e2d3d] rounded-lg p-4 hover:border-[#00ff88]/40 hover:bg-[#00ff88]/5 transition-all cursor-pointer group"
// //               >
// //                 <div className="flex items-center gap-2 mb-2">
// //                   <span className={`text-lg ${color}`}>{icon}</span>
// //                   <span className="text-sm font-semibold text-white group-hover:text-[#00ff88] transition-colors">{label}</span>
// //                   {badge && (
// //                     <span className="ml-auto font-mono text-[9px] bg-[#ff4757]/15 text-[#ff4757] border border-[#ff4757]/30 px-1.5 py-0.5 rounded">
// //                       {badge}
// //                     </span>
// //                   )}
// //                 </div>
// //                 <p className="text-[12px] text-[#57606f]">{desc}</p>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Hint box */}
// //           <div className="flex items-start gap-3 bg-[#141c24] border border-[#1e2d3d] border-l-[3px] border-l-[#00ff88] rounded-lg p-4 max-w-xl">
// //             <span className="text-[#00ff88] text-lg shrink-0 mt-0.5">◈</span>
// //             <p className="text-[13px] text-[#c8d6e5] leading-relaxed">
// //               <strong className="text-[#00ff88]">Pro tip:</strong> Click any category in the left sidebar
// //               to explore techniques, tools, and real command examples used in CTF competitions.
// //             </p>
// //           </div>

// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

// 'use client';

// import { Tree } from "@/components/Learn/Tree";

// export default function Page() {
//   return (
//     <div className="flex h-screen bg-[#0a0d0f] text-[#c8d6e5] overflow-hidden">

//       {/* ── LEFT SIDEBAR ── */}
//       <aside className="w-[28%] min-w-50 max-w-70 bg-[#0f1419] border-r border-[#1e2d3d] flex flex-col overflow-hidden">
//         <div className="px-4 py-3 bg-[#141c24] border-b border-[#1e2d3d] shrink-0">
//           {/* <p className="font-mono text-[11px] tracking-widest text-[#00ff88] mb-1">
//             CTF<span className="text-[#ff4757]">://</span>ATTACKS
//           </p> */}
//           <p className=" text-[20px] text-red-500">Categories</p>
//         </div>
//         <div className="flex-1 overflow-y-auto">
//           <Tree />
//         </div>
//       </aside>

//       {/* ── MAIN CONTENT ── */}
//       <main className="flex-1 flex flex-col overflow-hidden">

//         {/* Top bar */}
//         {/* <div className="flex items-center gap-3 px-6 py-3 bg-[#141c24] border-b border-[#1e2d3d] shrink-0">
//           <span className="font-mono text-[11px] text-[#57606f]">
//             root@ctf:<span className="text-[#00ff88]">~/home</span>
//           </span>
//           <span className="ml-auto font-mono text-[11px] bg-[#00ccff]/10 text-[#00ccff] border border-[#00ccff]/25 px-3 py-0.5 rounded animate-pulse">
//             READY
//           </span>
//         </div> */}

//         {/* Scrollable body */}
//         <div className="flex-1 overflow-y-auto px-8 py-8">

//           {/* Hero — centered */}
//           <div className="text-center mb-10">
//             {/* <p className="font-mono text-[11px] tracking-[3px] text-[#00ff88] mb-3">
//               // CAPTURE THE FLAG
//             </p> */}
//             <h1 className="text-5xl font-bold text-white leading-tight mb-4">
//               Learn <span className="text-[#00ff88]">Hacking</span> Interactively
//             </h1>
//             <p className="text-[17px] text-[#57606f] leading-relaxed max-w-2xl mx-auto mb-6">
//                 In shadows, I exploit systems, capture flags, and conquer digital battlefields silently.
//               {/* CTF (Capture The Flag) is a platforms for noobs, cybersecurity competition where participants
//               solve security challenges */}
//               <br />
//               {/* Categories involved: Web exploitation, cryptography, reverse
//               engineering, and more — to find hidden{" "}
//               <span className="text-[#00ff88] font-mono">flags</span>. */}
//               Through persistence, I break defenses, uncover vulnerabilities, and claim flags.
//               Click any category on the left to explore attacks and techniques.
//             </p>

//             {/* Stat pills */}
//             <div className="flex justify-center gap-4 flex-wrap">
//               {[
//                 { label: "Categories",   value: "08",   color: "text-[#00ff88]" },
//                 { label: "Attack Types", value: "24+",  color: "text-[#00ccff]" },
//                 { label: "Difficulty",   value: "Medium", color: "text-yellow-500" },
//               ].map(({ label, value, color }) => (
//                 <div key={label} className="bg-[#141c24] border border-[#1e2d3d] rounded-lg px-6 py-3 flex items-center gap-3">
//                   <span className={`text-xl font-bold ${color}`}>{value}</span>
//                   <span className="text-[12px] text-[#57606f] ">{label}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Section label */}
//           <p className="text-[20px] tracking-[2px] text-[#57606f] mb-4"> ATTACK CATEGORIES</p>

//           {/* Category cards — 2 per row */}
//           <div className="grid grid-cols-2 gap-5 mb-10 ">
//             {[
//               {

//                 label: "Web Exploitation",
//                 // color: "text-green-400",
//                 // accent: "#00ff88",

//                 desc: "Web exploitation targets vulnerabilities in web applications — the most common CTF category. You'll manipulate HTTP requests, inject SQL payloads, abuse broken authentication, and exploit client-side flaws like XSS and CSRF to gain unauthorized access or extract sensitive data.",
//               },
//               {

//                 label: "Digital Forensics",
//                 // color: "text-[#00ccff]",
//                 // accent: "#00ccff",
//                 desc: "Forensics challenges involve analyzing files, memory dumps, packet captures, and disk images to uncover hidden data. You reconstruct deleted files, trace network conversations in Wireshark, and extract artifacts from RAM using tools like Volatility to find the flag.",
//               },
//               {
//                 // icon: "⬡",
//                 label: "Cryptography",
//                 // color: "text-[#ff4757]",
//                 // accent: "#ff4757",
//                 desc: "Cryptography challenges range from classical ciphers like Caesar and Vigenère to breaking real-world RSA, AES, and hash implementations. You exploit weak key generation, padding oracles, and mathematical flaws — cracking ciphertexts to reveal plaintext flags.",
//               },
//               {
//                 // icon: "◆",
//                 label: "Pwn / Binary Exploitation",
//                 // color: "text-[#00ff88]",
//                 // accent: "#00ff88",
//                 desc: "Binary exploitation requires crafting inputs that corrupt memory in running programs. You'll overflow stack buffers to hijack return addresses, build ROP chains to bypass NX protections, and abuse format string bugs to read or write arbitrary memory and get a remote shell.",
//               },
//               {
//                 // icon: "↩",
//                 label: "Reverse Engineering",
//                 // color: "text-[#00ccff]",
//                 // accent: "#00ccff",
//                 desc: "Reverse engineering means analyzing compiled binaries without source code. Using disassemblers like Ghidra or IDA Pro, you read assembly and decompiled pseudocode to understand program logic, defeat anti-debug tricks, and find the exact input that produces the flag.",
//               },
//               {
//                 // icon: "◇",
//                 label: "Misc / OSINT",
//                 // color: "text-[#ff4757]",
//                 // accent: "#ff4757",
//                 desc: "Miscellaneous challenges cover everything that doesn't fit a single category — open-source intelligence gathering, metadata extraction from images and documents, escaping Python or bash jails, and automating algorithmic puzzles under tight time limits using pwntools.",
//               },
//               {
//                 // icon: "⬢",
//                 label: "Network Attacks",
//                 // color: "text-[#00ff88]",
//                 // accent: "#00ff88",
//                 desc: "Network challenges involve intercepting and manipulating traffic between hosts. You'll perform ARP spoofing for man-in-the-middle attacks, scan for open ports with nmap, and exploit misconfigured protocols like FTP, SNMP, and Telnet to extract credentials.",
//               },
//               {
//                 // icon: "⬡",
//                 label: "Hardware & RF",
//                 // color: "text-[#00ccff]",
//                 // accent: "#00ccff",
//                 desc: "Hardware challenges target embedded devices and radio-frequency signals. You connect to UART or JTAG debug interfaces to dump firmware, use Software Defined Radio to capture and decode wireless signals, and analyze binaries with binwalk to find backdoors.",
//               },
//             ].map(({  label,  desc }) => (
//               <div
//                 key={label}
//                 className="bg-[#141c24] border border-[#1e2d3d] rounded-lg p-5 hover:bg-[#00ff88]/3 transition-all cursor-pointer group"
//                 style={{ borderLeftWidth: "3px", }}
//               >
//                 <div className="flex items-center gap-2 mb-2">
//                   {/* <span className={`text-base ${color}`}>{icon}</span> */}
//                   <span className="text-[14px] font-bold text-white group-hover:text-[#00ff88] transition-colors">
//                     {label}
//                   </span>
//                   {/* {badge && (
//                     <span className="font-mono text-[9px] bg-[#ff4757]/15 text-[#ff4757] border border-[#ff4757]/30 px-1.5 py-0.5 rounded">
//                       {badge}
//                     </span>
//                   )} */}
//                 </div>
//                 <p className="text-[13px] text-[#7a8a9a] leading-relaxed">{desc}</p>
//               </div>
//             ))}
//           </div>

//           {/* Hint box */}
//           <div className="flex items-start gap-3 bg-[#141c24] border border-[#1e2d3d] border-l-[3px] border-l-[#00ff88] rounded-lg p-4">
//             <span className="text-[#00ff88] text-lg shrink-0 mt-0.5">◈</span>
//             <p className="text-[13px] text-[#c8d6e5] leading-relaxed">
//               <strong className="text-[#00ff88]">Pro tip:</strong> Click any category in the
//               left sidebar to explore sub-techniques, real commands, and tools used in CTF competitions.
//             </p>
//           </div>

//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

import { Tree } from "@/components/Learn/Tree";

export default function Page() {
  return (
    <div className="flex h-screen bg-[#0a0d0f] text-[#c8d6e5] overflow-hidden">
      {/* ── LEFT SIDEBAR ── */}
      <aside className="w-[28%] min-w-50 max-w-70 bg-[#0f1419] border-r border-[#1e2d3d] flex flex-col overflow-hidden">
        <div className="px-4 py-3 bg-[#141c24] border-b border-[#1e2d3d] shrink-0">
          {/* <p className="font-mono text-[11px] tracking-widest text-[#00ff88] mb-1">
            CTF<span className="text-[#ff4757]">://</span>ATTACKS
          </p> */}
          <p className="text-[20px] text-green-500">Categories</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          <Tree />
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          {/* Hero — centered */}
          <div className="text-center mb-10">
            <p className="text-[25px] font-bold tracking-[3px] text-[#00ff88] mb-3">
              CAPTURE THE FLAG
            </p>
            <h1 className="text-5xl font-bold text-white leading-tight mb-4">
              Learn <span className="text-[#00ff88]">Hacking</span>{" "}
              Interactively
            </h1>
            <p className="text-[15px] text-[#57606f] leading-relaxed max-w-2xl mx-auto mb-6">
              {/* CTF (Capture The Flag) is a cybersecurity competition where participants
              solve security challenges across web exploitation, cryptography, reverse
              engineering, and more — to find hidden{" "}
              <span className="text-[#00ff88] font-mono">flags</span>.
              Click any category on the left to explore attacks and techniques. */}
              In shadows, I exploit systems, capture flags, and conquer digital
              battlefields silently.
              <br />
              Through persistence, I break defenses, uncover vulnerabilities,
              and claim flags.
              <br />
              Click any category on the left to explore attacks and techniques.
            </p>

            {/* Stat pills */}
            <div className="flex justify-center gap-4 flex-wrap">
              {[
                { label: "Categories", value: "08", color: "text-[#00ff88]" },
                {
                  label: "Attack Types",
                  value: "24+",
                  color: "text-[#00ccff]",
                },
                {
                  label: "Difficulty",
                  value: "Medium",
                  color: "text-yellow-500",
                },
              ].map(({ label, value, color }) => (
                <div
                  key={label}
                  className="bg-[#141c24] border border-[#1e2d3d] rounded-lg px-6 py-3 flex items-center gap-3"
                >
                  <span className={`text-xl font-bold ${color}`}>{value}</span>
                  <span className="text-[12px] text-[#57606f] font-mono">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section label */}
          <p className=" text-[20px] tracking-[2px] text-[#57606f] mb-4">
            CATEGORIES
          </p>

          {/* Category cards — 2 per row */}
          <div className="grid grid-cols-2 gap-5 mb-8">
            {[
              {
                icon: "◉",
                label: "Web Exploitation",
                color: "text-[#00ff88]",
                accent: "#00ff88",
                // badge: "HOT",
                desc: "Web exploitation involves identifying and abusing vulnerabilities in web applications—like injection flaws, authentication bypasses, and misconfigurations—to gain unauthorized access, extract sensitive data, or manipulate functionality while solving challenges in realistic attack scenarios during competitions.",
              },
              {
                icon: "◈",
                label: "Digital Forensics",
                color: "text-[#00ccff]",
                accent: "#00ccff",
                desc: "Forensics challenges involve analyzing files, memory dumps, packet captures, and disk images to uncover hidden data. You reconstruct deleted files, trace network conversations in Wireshark, and extract artifacts from RAM using tools like Volatility to find the flag.",
              },
              {
                icon: "⬡",
                label: "Cryptography",
                color: "text-[#ff4757]",
                accent: "#ff4757",
                desc: "Cryptography challenges focus on breaking or analyzing encryption schemes, hashes, and ciphers. Participants exploit weak implementations, poor randomness, or flawed algorithms to recover hidden messages, keys, or flags from seemingly secure data.",
              },
              {
                icon: "◆",
                label: "Pwn / Binary Exploitation",
                color: "text-[#00ff88]",
                accent: "#00ff88",
                desc: "Binary exploitation requires crafting inputs that corrupt memory in running programs. You'll overflow stack buffers to hijack return addresses, build ROP chains to bypass NX protections, and abuse format string bugs to read or write arbitrary memory and get a remote shell.",
              },
              {
                icon: "↩",
                label: "Reverse Engineering",
                color: "text-[#00ccff]",
                accent: "#00ccff",
                desc: "Reverse engineering involves analyzing compiled binaries or applications to understand their logic. By decompiling, debugging, or tracing execution, players uncover hidden functionality, bypass checks, and extract secrets embedded within the program.",
              },
              {
                icon: "◇",
                label: "Misc / OSINT",
                color: "text-[#ff4757]",
                accent: "#ff4757",
                desc: "Miscellaneous challenges cover everything that doesn't fit a single category — open-source intelligence gathering, metadata extraction from images and documents, escaping Python or bash jails, and automating algorithmic puzzles under tight time limits using pwntools.",
              },
              {
                icon: "⬢",
                label: "Network Attacks",
                color: "text-[#00ff88]",
                accent: "#00ff88",
                desc: "Network challenges involve intercepting and manipulating traffic between hosts. You'll perform ARP spoofing for man-in-the-middle attacks, scan for open ports with nmap, and exploit misconfigured protocols like FTP, SNMP, and Telnet to extract credentials.",
              },
              {
                icon: "⬡",
                label: "Hardware & RF",
                color: "text-[#00ccff]",
                accent: "#00ccff",
                desc: "Hardware challenges target embedded devices and radio-frequency signals. You connect to UART or JTAG debug interfaces to dump firmware, use Software Defined Radio to capture and decode wireless signals, and analyze binaries with binwalk to find backdoors.",
              },
            ].map(({ icon, label, color, accent, desc }) => (
              <div
                key={label}
                className="bg-[#141c24] border border-[#1e2d3d] rounded-lg p-5 hover:bg-[#00ff88]/3 transition-all cursor-pointer group"
                style={{ borderLeftWidth: "3px", borderLeftColor: accent }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-base ${color}`}>{icon}</span>
                  <span className="text-[18px] font-bold text-white group-hover:text-[#00ff88] transition-colors">
                    {label}
                  </span>
                  {/* {badge && (
                    <span className="font-mono text-[9px] bg-[#ff4757]/15 text-[#ff4757] border border-[#ff4757]/30 px-1.5 py-0.5 rounded">
                      {badge}
                    </span>
                  )} */}
                </div>
                <p className="text-sm text-gray-400 leading-relaxed tracking-normal">
                  {desc}
                </p>
              </div>
            ))}
          </div>

          {/* Hint box */}
          <div className="flex items-start gap-3 bg-[#141c24] border border-[#1e2d3d] border-l-[3px] border-l-[#00ff88] rounded-lg p-4">
            <span className="text-[#00ff88] text-lg shrink-0 mt-0.5">◈</span>
            <p className="text-[15px] text-[#c8d6e5] leading-relaxed">
              <strong className="text-[#00ff88]">Pro tip:</strong> Click any
              category in the left sidebar to explore sub-techniques, real
              commands, and tools used in CTF competitions.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
