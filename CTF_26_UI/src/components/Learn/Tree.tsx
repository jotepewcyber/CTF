import { TreeView } from "./TreeView";

const Tree = () => {
  const treeData = [
    {
      id: "1",
      label: "Web Attacks",
      children: [
        {
          id: "1-1",
          label: "SQL Injection",
          children: [
            {
              id: "1-1-1",
              label: "Normal SQLi",
              link: "https://medium.com/@arunodayvmtiwari1102/sql-injection-attack-b8d62197119f",
            },
            {
              id: "1-1-2",
              label: "SQL Truncation",
              link: "https://medium.com/@arunodayvmtiwari1102/ctf-involving-sql-truncation-attack-and-account-duplication-6916ed018ad6",
            },
          ],
        },
        {
          id: "1-2",
          label: "XSS",
          children: [
            { id: "1-2-1", label: "Reflected XSS" },
            { id: "1-2-2", label: "Stored XSS" },
          ],
        },
        {
          id: "1-3",
          label: "Command Injection Attacks",
        },
      ],
    },

    {
      id: "2",
      label: "Network Based Attacks",
      children: [
        { id: "2-1", label: "Anonymous FTP" },
        { id: "2-2", label: "SSH Shells" },
      ],
    },

    {
      id: "3",
      label: "Encryption/Decryption Attacks",
      children: [
        { id: "3-1", label: "Cryptography" },
        { id: "3-2", label: "Steganography" },
        { id: "3-3", label: "Hashing" },
        { id: "3-4", label: "Decryption" },
      ],
    },

    {
      id: "4",
      label: "Miscellaneous vulnerabilities",
      children: [
        //directory trversal--gobuster
        //race condition
        { id: "2-1", label: "Directory Traversal" },
        { id: "2-2", label: "Race Condition" },
        //   { id: "2-3", label: "video.mp4" },
      ],
    },

    {
      id: "5",
      label: "HTTP Request Smuggling",
      // children: [
      //     //directory trversal--gobuster
      //     //race condition
      //   { id: "2-1", label: "setup.exe" },
      //   { id: "2-2", label: "image.jpg" },
      //   { id: "2-3", label: "video.mp4" },
      // ],
    },
  ];

  return (
    <>
      <div className="max-w-xl mx-auto w-full text-white">
        <TreeView
          data={treeData}
          // onNodeClick={(node) => console.log("Clicked:", node.label)}
          defaultExpandedIds={["1"]}
        />
      </div>
    </>
  );
};

export { Tree };
