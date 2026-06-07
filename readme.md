flowchart TD

%% ================= FRONTEND =================
A[React Frontend (Vite)] --> B[Pages Layer]
B --> B1[Home.jsx]

A --> C[Components Layer]
C --> C1[NoteEditor]
C --> C2[NotesList]
C --> C3[Sidebar]
C --> C4[NoteCard]
C --> C5[ColorPicker / ColorModal]

A --> D[API Layer]
D --> D1[notesApi.js]
D --> D2[noteApi.js]

D1 --> E[Axios HTTP Requests]
D2 --> E

%% ================= BACKEND =================
E --> F[Express Server (server.js)]

F --> G[Routes Layer]
G --> G1[noteRoutes.js]

G1 --> H[Controllers Layer]
H --> H1[createNote]
H --> H2[getNotes]
H --> H3[updateNote]
H --> H4[deleteNote]

H --> I[Model Layer]
I --> I1[Note Schema (Mongoose)]

%% ================= DATABASE =================
I1 --> J[(MongoDB Database)]

%% ================= RESPONSE FLOW =================
J --> H
H --> G
G --> F
F --> E
E --> A