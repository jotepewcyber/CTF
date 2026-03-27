// "use client";

// import { motion } from "framer-motion";
// import { Trophy, Medal } from "lucide-react";

// const winners = [
//   {
//     position: 1,
//     name: "Rohan Singh",
//     rollNo: "2023001",
//     score: 9850,
//     prize: "₹10,000",
//   },
//   {
//     position: 2,
//     name: "Aarav Sharma",
//     rollNo: "2024001",
//     score: 8650,
//     prize: "₹6,000",
//   },
//   {
//     position: 3,
//     name: "Ananya Das",
//     rollNo: "2024010",
//     score: 7920,
//     prize: "₹4,000",
//   },
// ];

// export const Results = () => {
//   return (
//<>
// <section id="results">
//     <div className="w-full relative">
//       <div className="max-w-7xl mx-auto px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <div className="flex items-center justify-center gap-3 mb-6">
//             <Trophy className="w-8 h-8 text-yellow-400" />
//             <h2 className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300">
//               Cognitia'26 Results
//             </h2>
//             <Trophy className="w-8 h-8 text-yellow-400" />
//           </div>
//           <p className="text-emerald-200/80">
//             Meet the champions of Cognitia'26
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
//           {winners.map((winner, idx) => (
//             <motion.div
//               key={idx}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: idx * 0.1 }}
//               className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all text-center"
//             >
//               <Medal className="w-12 h-12 mx-auto text-emerald-400 mb-4" />
//               <p className="text-2xl font-black text-yellow-400 mb-2">
//                 {winner.position === 1
//                   ? "🥇"
//                   : winner.position === 2
//                     ? "🥈"
//                     : "🥉"}{" "}
//                 Rank {winner.position}
//               </p>
//               <h3 className="text-xl font-bold text-emerald-300 mb-2">
//                 {winner.name}
//               </h3>
//               <p className="text-emerald-200/70 text-sm mb-3">
//                 {winner.rollNo}
//               </p>
//               <p className="text-emerald-400 font-bold mb-2">
//                 {winner.score} pts
//               </p>
//               <p className="text-emerald-300 font-semibold">{winner.prize}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
// </section>
// </>
//   );
// };

// export default Results;

"use client";

import { motion } from "framer-motion";
import { Trophy, Clock, Zap } from "lucide-react";

export const Results = () => {
  return (
    <>
      <section id="results">
        <div className="w-full relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <Trophy className="w-8 h-8 text-yellow-400" />
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300">
                  Cognitia'26 Results
                </h2>
                <Trophy className="w-8 h-8 text-yellow-400" />
              </div>
              <p className="text-emerald-200/80">
                Results will be announced after the competition concludes
              </p>
            </motion.div>

            {/* Coming Soon Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              {/* Left Side - Status */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col justify-center"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Clock className="w-8 h-8 text-emerald-400 animate-spin" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-emerald-300">
                      Competition Status
                    </h3>
                    <p className="text-emerald-200/70">Not Started Yet</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-black/30 rounded-lg border border-emerald-500/20">
                    <p className="text-emerald-300 font-semibold mb-1">
                      📅 Event Date
                    </p>
                    <p className="text-emerald-200/80">To Be Announced</p>
                  </div>

                  <div className="p-4 bg-black/30 rounded-lg border border-emerald-500/20">
                    <p className="text-emerald-300 font-semibold mb-1">
                      ⏱️ Registration Deadline
                    </p>
                    <p className="text-emerald-200/80">To Be Announced</p>
                  </div>

                  <div className="p-4 bg-black/30 rounded-lg border border-emerald-500/20">
                    <p className="text-emerald-300 font-semibold mb-1">
                      🏆 Results Release
                    </p>
                    <p className="text-emerald-200/80">After Competition</p>
                  </div>
                </div>
              </motion.div>

              {/* Right Side - Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="p-8 rounded-xl bg-linear-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-2xl font-black text-emerald-300">
                    What to Expect
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold text-lg">
                      ✓
                    </span>
                    <div>
                      <p className="text-emerald-300 font-semibold">
                        Live Leaderboard
                      </p>
                      <p className="text-emerald-200/70 text-sm">
                        Real-time rankings during the competition
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold text-lg">
                      ✓
                    </span>
                    <div>
                      <p className="text-emerald-300 font-semibold">
                        Final Rankings
                      </p>
                      <p className="text-emerald-200/70 text-sm">
                        Complete results with detailed scores
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold text-lg">
                      ✓
                    </span>
                    <div>
                      <p className="text-emerald-300 font-semibold">
                        Winner Announcements
                      </p>
                      <p className="text-emerald-200/70 text-sm">
                        Prizes and certificates for top performers
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3"></div>
                </div>
              </motion.div>
            </div>

            {/* Coming Soon Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 rounded-xl bg-linear-to-r from-yellow-500/20 to-emerald-500/20 border border-emerald-500/30 text-center"
            >
              <p className="text-emerald-200/90 text-lg">
                <span className="text-emerald-300 font-black">
                  🎯 Stay Tuned!
                </span>
                <br />
                Results will be published here immediately after Cognitia'26
                concludes. Check back soon for the complete rankings!
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all">
                  Register Now
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Results;
