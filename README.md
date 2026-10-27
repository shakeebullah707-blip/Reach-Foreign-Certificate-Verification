CERTIFICATE VERIFICATION WEBSITE

FOLDER STRUCTURE
certificate_verification_website/
├── index.html
├── style.css
├── script.js
├── data/
│   └── certificates.js
├── certificates/
│   └── certificate.jpg       (add your certificate image)
└── profiles/
    └── profile.jpg           (add your student profile image)

HOW URL / QR VERIFICATION WORKS
A link can open a certificate directly:
https://your-domain.example/index.html?id=AP-2026-001

The page reads the id parameter and automatically shows the matching certificate.
It also supports ?certificateId=AP-2026-001.
After a manual search, the URL updates to include the selected ID.
The "Copy Verification Link" button copies the current certificate URL.

TEST LOCALLY
1. Extract the ZIP.
2. Add your image files to certificates/ and profiles/ with the names above.
3. Open index.html and search AP-2026-001.
4. To test URL lookup locally, open:
   index.html?id=AP-2026-001
   (some browsers may limit features for file:// URLs; use a local server if needed.)

ADD ANOTHER CERTIFICATE
Edit data/certificates.js:
"AP-2026-002": {
  name: "Example Student",
  startDate: "01 February 2026",
  endDate: "30 July 2026",
  cnic: "XXXXX-XXXXXXX-X",
  profileImage: "profiles/example.jpg",
  certificateImage: "certificates/example-certificate.jpg"
}

QR CODE
Create a QR code containing the full published URL, including ?id=AP-2026-001.
The site must be hosted online for QR scans on other devices to work.

SECURITY
This front-end demo stores all records in a downloadable JavaScript file, so it is not secure for private data. For a production site, verify the ID through a server-side database and avoid exposing full CNIC numbers publicly.
