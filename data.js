// ============================================================
//  Rohan's Final Cut — Real Movie Data
//  Posters: TMDB CDN (no API key needed for images)
//  Trailers: Real YouTube IDs
// ============================================================
const TMDB_IMG   = 'https://image.tmdb.org/t/p/w500';
const TMDB_BG    = 'https://image.tmdb.org/t/p/original';
const RFC_DATA = {
  movies: [
    {
      id: "m001", type: "movie",
      title: "The Dark Knight",
      year: 2008, runtime: "2h 32m",
      genre: ["Action", "Crime", "Drama"],
      rating: 9.0, votes: 2800000,
      director: "Christopher Nolan",
      cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Gary Oldman", "Morgan Freeman"],
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      trailerYT: "EXeTwQWrcwY",
      posterUrl:  TMDB_IMG + "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      backdropUrl: TMDB_BG  + "/hqkIcbrOHL86UncnHIsHVcVmzue.jpg",
      accentColor: "#1a1a2e",
      gradient: "linear-gradient(135deg,#0d0d0d,#1a1a2e,#2d2d44)",
      isNew: false, isTrending: true, isFeatured: true,
      tags: ["Batman", "Villain", "Chaos", "Gotham"],
    },
    {
      id: "m002", type: "movie",
      title: "Inception",
      year: 2010, runtime: "2h 28m",
      genre: ["Sci-Fi", "Action", "Thriller"],
      rating: 8.8, votes: 2400000,
      director: "Christopher Nolan",
      cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page", "Tom Hardy", "Ken Watanabe"],
      description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      trailerYT: "YoHD9XEInc0",
      posterUrl:  TMDB_IMG + "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
      backdropUrl: TMDB_BG  + "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
      accentColor: "#1a3a5e",
      gradient: "linear-gradient(135deg,#0a1628,#1e3a5f,#2a4a7f)",
      isNew: false, isTrending: true, isFeatured: true,
      tags: ["Dreams", "Heist", "Mind-Bending"],
    },
    {
      id: "m003", type: "movie",
      title: "Interstellar",
      year: 2014, runtime: "2h 49m",
      genre: ["Sci-Fi", "Drama", "Adventure"],
      rating: 8.7, votes: 1900000,
      director: "Christopher Nolan",
      cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. Time, love and the laws of physics collide spectacularly.",
      trailerYT: "zSWdZVtXT7E",
      posterUrl:  TMDB_IMG + "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      backdropUrl: TMDB_BG  + "/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg",
      accentColor: "#003366",
      gradient: "linear-gradient(135deg,#0a0a2e,#1a1a6e,#003399)",
      isNew: false, isTrending: true, isFeatured: true,
      tags: ["Space", "Wormhole", "Time", "Love"],
    },
    {
      id: "m004", type: "movie",
      title: "Oppenheimer",
      year: 2023, runtime: "3h 00m",
      genre: ["Drama", "Historical"],
      rating: 8.5, votes: 980000,
      director: "Christopher Nolan",
      cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr.", "Florence Pugh"],
      description: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II — and the haunting moral weight of what he unleashed.",
      trailerYT: "uYPbbksJxIg",
      posterUrl:  TMDB_IMG + "/8Gxv8giaFQR7SoC2Z6hRaJBB9sP.jpg",
      backdropUrl: TMDB_BG  + "/fm6KqXpkh7wKqbs6sAKm0qxTkW6.jpg",
      accentColor: "#5a3000",
      gradient: "linear-gradient(135deg,#1a0a00,#5a3000,#8b4513)",
      isNew: false, isTrending: true, isFeatured: true,
      tags: ["Atomic Bomb", "War", "History", "Science"],
    },
    {
      id: "m005", type: "movie",
      title: "Parasite",
      year: 2019, runtime: "2h 12m",
      genre: ["Drama", "Thriller"],
      rating: 8.5, votes: 1100000,
      director: "Bong Joon-ho",
      cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong", "Choi Woo-shik"],
      description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan. A masterpiece of social horror.",
      trailerYT: "5xH0HfJHsaY",
      posterUrl:  TMDB_IMG + "/7IiTTgloROVKhN8ooN6dWHCMCNO.jpg",
      backdropUrl: TMDB_BG  + "/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg",
      accentColor: "#1a1a00",
      gradient: "linear-gradient(135deg,#0a0a00,#1a1a00,#2d2d00)",
      isNew: false, isTrending: true, isFeatured: true,
      tags: ["Class", "Family", "Satire", "Korean"],
    },
    {
      id: "m006", type: "movie",
      title: "Joker",
      year: 2019, runtime: "2h 02m",
      genre: ["Crime", "Drama"],
      rating: 8.4, votes: 1400000,
      director: "Todd Phillips",
      cast: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz", "Frances Conroy"],
      description: "A mentally troubled comedian's life spirals into madness, igniting a city-wide revolution as he transforms into the iconic villain Joker.",
      trailerYT: "zAGVQLHvwOY",
      posterUrl:  TMDB_IMG + "/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
      backdropUrl: TMDB_BG  + "/n6bUvigpRFqSwmPp1ZklgOlgSTY.jpg",
      accentColor: "#6f0000",
      gradient: "linear-gradient(135deg,#1a0000,#6f0000,#8b0000)",
      isNew: false, isTrending: true, isFeatured: true,
      tags: ["Villain", "Origin", "Society", "Chaos"],
    },
    {
      id: "m007", type: "movie",
      title: "Dune: Part Two",
      year: 2024, runtime: "2h 46m",
      genre: ["Sci-Fi", "Adventure"],
      rating: 8.6, votes: 760000,
      director: "Denis Villeneuve",
      cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Austin Butler", "Florence Pugh"],
      description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe.",
      trailerYT: "Way9FcgUAqs",
      posterUrl:  TMDB_IMG + "/cdqLnri3NEGcmfnqwk2TSIYtddg.jpg",
      backdropUrl: TMDB_BG  + "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
      accentColor: "#5a3a00",
      gradient: "linear-gradient(135deg,#2d1b00,#8b4513,#d2691e)",
      isNew: true, isTrending: true, isFeatured: true,
      tags: ["Epic", "Desert", "Prophecy", "War"],
    },
    {
      id: "m008", type: "movie",
      title: "Top Gun: Maverick",
      year: 2022, runtime: "2h 11m",
      genre: ["Action", "Drama"],
      rating: 8.3, votes: 870000,
      director: "Joseph Kosinski",
      cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly", "Jon Hamm", "Val Kilmer"],
      description: "After 30+ years of service as a top naval aviator, Pete Mitchell is where he belongs — pushing the boundaries as a test pilot. When he finds himself training Top Gun graduates for a specialized mission, he must face the ghost of his past.",
      trailerYT: "qSqVVswa420",
      posterUrl:  TMDB_IMG + "/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
      backdropUrl: TMDB_BG  + "/AkB0Hh5S2rZI3ub7gRHmVbzH5dM.jpg",
      accentColor: "#003399",
      gradient: "linear-gradient(135deg,#001a33,#003366,#0044aa)",
      isNew: false, isTrending: true, isFeatured: false,
      tags: ["Fighter Jets", "Navy", "Speed", "Action"],
    },
    {
      id: "m009", type: "movie",
      title: "Avengers: Endgame",
      year: 2019, runtime: "3h 01m",
      genre: ["Action", "Sci-Fi"],
      rating: 8.4, votes: 1200000,
      director: "Anthony & Joe Russo",
      cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth", "Scarlett Johansson"],
      description: "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more to undo Thanos' actions and restore order to the universe.",
      trailerYT: "TcMBFSGVi1c",
      posterUrl:  TMDB_IMG + "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
      backdropUrl: TMDB_BG  + "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
      accentColor: "#4a0066",
      gradient: "linear-gradient(135deg,#0a0014,#1a0033,#4a0066)",
      isNew: false, isTrending: false, isFeatured: false,
      tags: ["Marvel", "Heroes", "Time Travel", "Epic"],
    },
    {
      id: "m010", type: "movie",
      title: "Blade Runner 2049",
      year: 2017, runtime: "2h 44m",
      genre: ["Sci-Fi", "Drama"],
      rating: 8.0, votes: 640000,
      director: "Denis Villeneuve",
      cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas", "Sylvia Hoeks", "Robin Wright"],
      description: "A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.",
      trailerYT: "gD6bMkHgC9E",
      posterUrl:  TMDB_IMG + "/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
      backdropUrl: TMDB_BG  + "/ilRyazdMJwN05exqhwK4tMKBYZs.jpg",
      accentColor: "#2a1a00",
      gradient: "linear-gradient(135deg,#1a0a00,#3d2a00,#6b4700)",
      isNew: false, isTrending: false, isFeatured: false,
      tags: ["Dystopia", "AI", "Memory", "Cyberpunk"],
    },
    {
      id: "m011", type: "movie",
      title: "Spider-Man: No Way Home",
      year: 2021, runtime: "2h 28m",
      genre: ["Action", "Sci-Fi"],
      rating: 8.2, votes: 970000,
      director: "Jon Watts",
      cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch", "Willem Dafoe", "Alfred Molina"],
      description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear — forcing Peter to discover what it truly means to be Spider-Man.",
      trailerYT: "JfVOs4VSpmA",
      posterUrl:  TMDB_IMG + "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
      backdropUrl: TMDB_BG  + "/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg",
      accentColor: "#660000",
      gradient: "linear-gradient(135deg,#1a0000,#4a0000,#660000)",
      isNew: false, isTrending: false, isFeatured: false,
      tags: ["Multiverse", "Marvel", "Spider-Man"],
    },
    {
      id: "m012", type: "movie",
      title: "Mad Max: Fury Road",
      year: 2015, runtime: "2h 00m",
      genre: ["Action", "Sci-Fi"],
      rating: 8.1, votes: 1000000,
      director: "George Miller",
      cast: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult", "Hugh Keays-Byrne"],
      description: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.",
      trailerYT: "hEJnMQG9ev8",
      posterUrl:  TMDB_IMG + "/kqjL17yufvn9OVLyXYpvtyrFfak.jpg",
      backdropUrl: TMDB_BG  + "/phszHPFVhPHhMZgo0fWTKBDQsJA.jpg",
      accentColor: "#8b4513",
      gradient: "linear-gradient(135deg,#2d1b00,#6b3a00,#8b4513)",
      isNew: false, isTrending: false, isFeatured: false,
      tags: ["Post-Apocalyptic", "Chase", "Survival"],
    },
    {
      id: "m013", type: "movie",
      title: "1917",
      year: 2019, runtime: "1h 59m",
      genre: ["Drama", "Historical"],
      rating: 8.3, votes: 690000,
      director: "Sam Mendes",
      cast: ["George MacKay", "Dean-Charles Chapman", "Mark Strong", "Andrew Scott", "Richard Madden"],
      description: "At the height of the First World War, two young British soldiers are given a near-impossible mission: cross enemy territory and deliver a message that could save 1,600 men.",
      trailerYT: "YqNYrYUiMfg",
      posterUrl:  TMDB_IMG + "/iZf0KyrE25z1sage4SYFLCCrMi9.jpg",
      backdropUrl: TMDB_BG  + "/2RSq4ryHLJVtG3nOOS9LYGM4Kbq.jpg",
      accentColor: "#3d3000",
      gradient: "linear-gradient(135deg,#1a1400,#3d3000,#6b5500)",
      isNew: false, isTrending: false, isFeatured: false,
      tags: ["WWI", "Mission", "One Take", "War"],
    },
    {
      id: "m014", type: "movie",
      title: "The Batman",
      year: 2022, runtime: "2h 56m",
      genre: ["Action", "Crime"],
      rating: 7.9, votes: 820000,
      director: "Matt Reeves",
      cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano", "Jeffrey Wright", "Colin Farrell"],
      description: "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
      trailerYT: "mqqft2x_Aa4",
      posterUrl:  TMDB_IMG + "/74xTEgt7R36Fpocon6mjTxez0Vt.jpg",
      backdropUrl: TMDB_BG  + "/5P8SmMoberXi09g6LeBLJzELtv8.jpg",
      accentColor: "#0a0a1a",
      gradient: "linear-gradient(135deg,#05050f,#0a0a1a,#151530)",
      isNew: false, isTrending: false, isFeatured: false,
      tags: ["Batman", "Noir", "Detective", "Dark"],
    },
    {
      id: "m015", type: "movie",
      title: "Tenet",
      year: 2020, runtime: "2h 30m",
      genre: ["Sci-Fi", "Action", "Thriller"],
      rating: 7.4, votes: 580000,
      director: "Christopher Nolan",
      cast: ["John David Washington", "Robert Pattinson", "Elizabeth Debicki", "Kenneth Branagh"],
      description: "Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.",
      trailerYT: "LdOM0x0XDMo",
      posterUrl:  TMDB_IMG + "/k68nPLbIST6NP96JmTxmZijZchr.jpg",
      backdropUrl: TMDB_BG  + "/wzJRB4MKi3yK138bW1ePGQJService.jpg",
      accentColor: "#1a1a3e",
      gradient: "linear-gradient(135deg,#0a0a1a,#1a1a3e,#2a2a5e)",
      isNew: false, isTrending: false, isFeatured: false,
      tags: ["Time Inversion", "Espionage", "Spy"],
    },
    {
      id: "m016", type: "movie",
      title: "Everything Everywhere All at Once",
      year: 2022, runtime: "2h 19m",
      genre: ["Sci-Fi", "Comedy", "Drama"],
      rating: 7.8, votes: 700000,
      director: "Daniels (Daniel Kwan & Daniel Scheinert)",
      cast: ["Michelle Yeoh", "Stephanie Hsu", "Ke Huy Quan", "Jamie Lee Curtis"],
      description: "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes connecting with the lives she could have led.",
      trailerYT: "wxN1T1uxQ2g",
      posterUrl:  TMDB_IMG + "/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
      backdropUrl: TMDB_BG  + "/ss0Os3uWJfQAENIpo6SlKaZKDgo.jpg",
      accentColor: "#660066",
      gradient: "linear-gradient(135deg,#1a001a,#4a004a,#660066)",
      isNew: false, isTrending: false, isFeatured: false,
      tags: ["Multiverse", "Family", "Identity", "Absurdist"],
    },
    {
      id: "m017", type: "movie",
      title: "Get Out",
      year: 2017, runtime: "1h 44m",
      genre: ["Horror", "Thriller"],
      rating: 7.7, votes: 680000,
      director: "Jordan Peele",
      cast: ["Daniel Kaluuya", "Allison Williams", "Bradley Whitford", "Catherine Keener"],
      description: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
      trailerYT: "DzfpyUB60YY",
      posterUrl:  TMDB_IMG + "/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg",
      backdropUrl: TMDB_BG  + "/ogQOkyFsJo1oDqkHyXZX2y9bBp.jpg",
      accentColor: "#1a0a00",
      gradient: "linear-gradient(135deg,#0a0500,#1a0a00,#2d1400)",
      isNew: false, isTrending: false, isFeatured: false,
      tags: ["Race", "Horror", "Psychological", "Social"],
    },
    {
      id: "m018", type: "movie",
      title: "Black Panther",
      year: 2018, runtime: "2h 14m",
      genre: ["Action", "Sci-Fi"],
      rating: 7.3, votes: 880000,
      director: "Ryan Coogler",
      cast: ["Chadwick Boseman", "Michael B. Jordan", "Lupita Nyong'o", "Danai Gurira"],
      description: "T'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country's past.",
      trailerYT: "xjDjIWPAn6c",
      posterUrl:  TMDB_IMG + "/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
      backdropUrl: TMDB_BG  + "/b6ZJZHUdMEFECvGiDpJjlfUWela.jpg",
      accentColor: "#4a004a",
      gradient: "linear-gradient(135deg,#1a001a,#3a003a,#4a004a)",
      isNew: false, isTrending: false, isFeatured: false,
      tags: ["Wakanda", "Marvel", "Africa", "King"],
    },
    {
      id: "m019", type: "movie",
      title: "The Revenant",
      year: 2015, runtime: "2h 36m",
      genre: ["Drama", "Western"],
      rating: 8.0, votes: 780000,
      director: "Alejandro G. Iñárritu",
      cast: ["Leonardo DiCaprio", "Tom Hardy", "Will Poulter", "Domhnall Gleeson"],
      description: "A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear. Abandoned by members of his crew, he is driven by revenge.",
      trailerYT: "LoebZZ8K5N0",
      posterUrl:  TMDB_IMG + "/dM2w364MScsjFf8pfMbaWUcWrR.jpg",
      backdropUrl: TMDB_BG  + "/yCkLMR7c9NcxWuHRnCHJXOzUBVR.jpg",
      accentColor: "#1a1400",
      gradient: "linear-gradient(135deg,#0a0a00,#1a1400,#2d2800)",
      isNew: false, isTrending: false, isFeatured: false,
      tags: ["Survival", "Revenge", "Wilderness", "Oscar"],
    },
    {
      id: "m020", type: "movie",
      title: "Whiplash",
      year: 2014, runtime: "1h 47m",
      genre: ["Drama", "Music"],
      rating: 8.5, votes: 820000,
      director: "Damien Chazelle",
      cast: ["Miles Teller", "J.K. Simmons", "Melissa Benoist", "Paul Reiser"],
      description: "A promising young drummer enrolls at a cutthroat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
      trailerYT: "7d_jQycdQGo",
      posterUrl:  TMDB_IMG + "/oPX04GtX9xfZJvS16BnNLRnIkWT.jpg",
      backdropUrl: TMDB_BG  + "/oWRrGX3Qq8KHIFqBzh2hpfTNRBC.jpg",
      accentColor: "#2a0000",
      gradient: "linear-gradient(135deg,#1a0000,#2a0000,#4a0000)",
      isNew: false, isTrending: false, isFeatured: false,
      tags: ["Music", "Obsession", "Drummer", "Perfectionism"],
    }
  ],
  series: [
    {
      id: "s001", type: "series",
      title: "Breaking Bad",
      year: 2008, seasons: 5, episodes: 62,
      genre: ["Crime", "Drama"],
      rating: 9.5, votes: 2100000,
      creator: "Vince Gilligan",
      cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn", "Dean Norris", "Bob Odenkirk"],
      description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future — and transforms into someone unrecognizable.",
      trailerYT: "HhesaQXLuRY",
      posterUrl:  TMDB_IMG + "/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
      backdropUrl: TMDB_BG  + "/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
      accentColor: "#3d2a00",
      gradient: "linear-gradient(135deg,#1a1200,#3d2a00,#6b4700)",
      isNew: false, isTrending: true, isFeatured: true,
      tags: ["Crime", "Chemistry", "New Mexico", "Transformation"],
    },
    {
      id: "s002", type: "series",
      title: "Game of Thrones",
      year: 2011, seasons: 8, episodes: 73,
      genre: ["Fantasy", "Drama"],
      rating: 9.2, votes: 2300000,
      creator: "David Benioff & D.B. Weiss",
      cast: ["Emilia Clarke", "Kit Harington", "Peter Dinklage", "Lena Headey", "Nikolaj Coster-Waldau"],
      description: "Nine noble families fight for control over the mythical lands of Westeros, while an ancient enemy returns after being dormant for thousands of years.",
      trailerYT: "KPLWWIOCOOQ",
      posterUrl:  TMDB_IMG + "/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
      backdropUrl: TMDB_BG  + "/suopoADq0k8YZr4dQXcU6pToj6s.jpg",
      accentColor: "#3d1a00",
      gradient: "linear-gradient(135deg,#1a0a00,#3d1a00,#6b2a00)",
      isNew: false, isTrending: true, isFeatured: true,
      tags: ["Dragons", "Westeros", "War", "Politics"],
    },
    {
      id: "s003", type: "series",
      title: "Stranger Things",
      year: 2016, seasons: 4, episodes: 34,
      genre: ["Sci-Fi", "Horror"],
      rating: 8.7, votes: 1400000,
      creator: "The Duffer Brothers",
      cast: ["Millie Bobby Brown", "Finn Wolfhard", "David Harbour", "Winona Ryder", "Gaten Matarazzo"],
      description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back — and uncover a chilling government conspiracy.",
      trailerYT: "b9EkMc79ZSU",
      posterUrl:  TMDB_IMG + "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
      backdropUrl: TMDB_BG  + "/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
      accentColor: "#0a001a",
      gradient: "linear-gradient(135deg,#050010,#0a001a,#15003d)",
      isNew: false, isTrending: true, isFeatured: true,
      tags: ["Upside Down", "Supernatural", "80s", "Kids"],
    },
    {
      id: "s004", type: "series",
      title: "The Last of Us",
      year: 2023, seasons: 2, episodes: 17,
      genre: ["Drama", "Horror"],
      rating: 8.8, votes: 870000,
      creator: "Craig Mazin & Neil Druckmann",
      cast: ["Pedro Pascal", "Bella Ramsey", "Anna Torv", "Gabriel Luna", "Merle Dandridge"],
      description: "Twenty years after modern civilization has been destroyed by a fungal infection, Joel, a hardened survivor, is hired to smuggle Ellie, a 14-year-old girl, out of an oppressive quarantine zone.",
      trailerYT: "uLtkt4BNL-M",
      posterUrl:  TMDB_IMG + "/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
      backdropUrl: TMDB_BG  + "/gPbM0MK8CP8A174rmUwGsADNYKD.jpg",
      accentColor: "#2a1a00",
      gradient: "linear-gradient(135deg,#1a0a00,#2a1a00,#4a3000)",
      isNew: true, isTrending: true, isFeatured: true,
      tags: ["Apocalypse", "Fungal", "Survival", "HBO"],
    },
    {
      id: "s005", type: "series",
      title: "House of the Dragon",
      year: 2022, seasons: 2, episodes: 18,
      genre: ["Fantasy", "Drama"],
      rating: 8.4, votes: 680000,
      creator: "Ryan Condal & George R.R. Martin",
      cast: ["Paddy Considine", "Emma D'Arcy", "Matt Smith", "Olivia Cooke", "Rhys Ifans"],
      description: "The story of House Targaryen set 200 years before the events of Game of Thrones. The beginning of the end of the dragons — the Dance of Dragons, the Targaryen civil war.",
      trailerYT: "DotnJ7tTA34",
      posterUrl:  TMDB_IMG + "/z2yahl2uefxDCl0nogcRBstwruJ.jpg",
      backdropUrl: TMDB_BG  + "/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg",
      accentColor: "#4a0000",
      gradient: "linear-gradient(135deg,#1a0000,#4a0000,#8b0000)",
      isNew: true, isTrending: true, isFeatured: false,
      tags: ["Dragons", "Targaryens", "Civil War", "Westeros"],
    },
    {
      id: "s006", type: "series",
      title: "Squid Game",
      year: 2021, seasons: 2, episodes: 16,
      genre: ["Thriller", "Drama"],
      rating: 8.0, votes: 890000,
      creator: "Hwang Dong-hyuk",
      cast: ["Lee Jung-jae", "Park Hae-soo", "Wi Ha-jun", "Jung Ho-yeon", "O Yeong-su"],
      description: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits — with deadly high stakes.",
      trailerYT: "oqxAJKy0ii4",
      posterUrl:  TMDB_IMG + "/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
      backdropUrl: TMDB_BG  + "/qw3J9cNeLioOLoR68WX7z79aCdK.jpg",
      accentColor: "#4a0044",
      gradient: "linear-gradient(135deg,#1a001a,#4a0044,#660066)",
      isNew: false, isTrending: true, isFeatured: false,
      tags: ["Games", "Survival", "Korean", "Netflix"],
    },
    {
      id: "s007", type: "series",
      title: "Dark",
      year: 2017, seasons: 3, episodes: 26,
      genre: ["Sci-Fi", "Mystery"],
      rating: 8.8, votes: 490000,
      creator: "Baran bo Odar & Jantje Friese",
      cast: ["Louis Hofmann", "Oliver Masucci", "Karoline Eichhorn", "Lisa Vicari"],
      description: "A thriller that begins with two missing children in a small German town and expands into a story about four interconnected families and a wormhole that links their pasts — and futures.",
      trailerYT: "ESEUoa-mz2c",
      posterUrl:  TMDB_IMG + "/apbrbWs5wheK7VN6V92jPneiQQ.jpg",
      backdropUrl: TMDB_BG  + "/w5idpFZiJJAUEfepNsOJeFXPSfH.jpg",
      accentColor: "#001a33",
      gradient: "linear-gradient(135deg,#000d1a,#001a33,#002244)",
      isNew: false, isTrending: false, isFeatured: false,
      tags: ["Time Travel", "German", "Mystery", "Family"],
    },
    {
      id: "s008", type: "series",
      title: "The Witcher",
      year: 2019, seasons: 3, episodes: 24,
      genre: ["Fantasy", "Action"],
      rating: 8.0, votes: 530000,
      creator: "Lauren Schmidt Hissrich",
      cast: ["Henry Cavill", "Anya Chalotra", "Freya Allan", "Joey Batey", "MyAnna Buring"],
      description: "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.",
      trailerYT: "ndl5MZb-HdA",
      posterUrl:  TMDB_IMG + "/7vjaCdMw15FEbXyLQTVa04URsPm.jpg",
      backdropUrl: TMDB_BG  + "/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg",
      accentColor: "#2a1a00",
      gradient: "linear-gradient(135deg,#1a0a00,#2a1a00,#4a3000)",
      isNew: false, isTrending: false, isFeatured: false,
      tags: ["Monster Hunter", "Magic", "Medieval", "Fantasy"],
    },
    {
      id: "s009", type: "series",
      title: "Succession",
      year: 2018, seasons: 4, episodes: 39,
      genre: ["Drama"],
      rating: 8.9, votes: 440000,
      creator: "Jesse Armstrong",
      cast: ["Brian Cox", "Jeremy Strong", "Sarah Snook", "Kieran Culkin", "Matthew Macfadyen"],
      description: "The Roy family is known for controlling the biggest media and entertainment company in the world. But their world changes when their aging patriarch plans to step aside.",
      trailerYT: "OqCiMBZfpAo",
      posterUrl:  TMDB_IMG + "/e2X8zCjAhFWMwsqQMrJrQXvNVS0.jpg",
      backdropUrl: TMDB_BG  + "/ebiIfZ6VTXBerOFMhRlhdgKGTId.jpg",
      accentColor: "#1a1a1a",
      gradient: "linear-gradient(135deg,#0a0a0a,#1a1a1a,#2a2a2a)",
      isNew: false, isTrending: false, isFeatured: false,
      tags: ["Power", "Family", "Media Empire", "Satire"],
    },
    {
      id: "s010", type: "series",
      title: "The Crown",
      year: 2016, seasons: 6, episodes: 60,
      genre: ["Historical", "Drama"],
      rating: 8.6, votes: 380000,
      creator: "Peter Morgan",
      cast: ["Claire Foy", "Olivia Colman", "Imelda Staunton", "Matt Smith", "Tobias Menzies"],
      description: "Follows the political rivalries and romances of the reign of Queen Elizabeth II and the events that shaped the second half of the 20th century.",
      trailerYT: "JWtnJjn6ng0",
      posterUrl:  TMDB_IMG + "/d0xn0IkPRWFWKm3MJ2prmj2jjf3.jpg",
      backdropUrl: TMDB_BG  + "/1fopjot3aTQfDCaLRDnMSdB5qfs.jpg",
      accentColor: "#3d2a00",
      gradient: "linear-gradient(135deg,#1a1400,#3d2a00,#5a4500)",
      isNew: false, isTrending: false, isFeatured: false,
      tags: ["Royalty", "Queen", "British", "Politics"],
    }
  ],
  reviews: {
    m001: [
      { id: "r1", user: "CineVault", avatar: "C", rating: 10, text: "Heath Ledger's Joker is the greatest villain performance in cinema history. The Dark Knight transcends superhero films — it's a crime epic. Absolute masterpiece.", date: "2024-01-15" },
      { id: "r2", user: "FilmFreak99", avatar: "F", rating: 9, text: "The interrogation scene alone is worth 10 stars. Nolan at his absolute peak. A film that will never age.", date: "2024-02-18" },
      { id: "r3", user: "NeonCritic", avatar: "N", rating: 10, text: "Rewatched for the 20th time. Still gives me chills. 'Some men just want to watch the world burn.' Cinema.", date: "2024-03-05" }
    ],
    m002: [
      { id: "r4", user: "DreamWeaver", avatar: "D", rating: 9, text: "The layers of this film are endless. Every rewatch reveals something new. DiCaprio is perfect.", date: "2024-01-20" },
      { id: "r5", user: "MovieBuff_X", avatar: "M", rating: 10, text: "Still the most mind-bending film I've ever seen. The top keeps spinning in my head.", date: "2024-02-10" }
    ],
    m003: [
      { id: "r6", user: "StarGazer", avatar: "S", rating: 10, text: "Interstellar made me cry in a way no film ever has. The docking scene is cinema at its finest.", date: "2024-01-12" },
      { id: "r7", user: "SpaceNerd42", avatar: "S", rating: 9, text: "Hans Zimmer's score alone elevates this beyond any sci-fi film made before. Breathtaking.", date: "2024-02-01" }
    ],
    m004: [
      { id: "r8", user: "HistoryBuff", avatar: "H", rating: 9, text: "Cillian Murphy is extraordinary. Nolan's most mature, complex film. Three hours felt like 90 minutes.", date: "2023-08-20" },
      { id: "r9", user: "OscarWatcher", avatar: "O", rating: 10, text: "Deserved every Oscar it won. The Trinity test sequence will live in cinema history forever.", date: "2023-09-05" }
    ],
    m005: [
      { id: "r10", user: "KoreanCinema", avatar: "K", rating: 10, text: "Bong Joon-ho is a genius. Parasite works as comedy, thriller, and devastating social commentary simultaneously.", date: "2024-01-08" },
      { id: "r11", user: "CriticsChoice", avatar: "C", rating: 10, text: "The best film of the 21st century. Period.", date: "2024-01-25" }
    ],
    m006: [
      { id: "r12", user: "JokerFan", avatar: "J", rating: 10, text: "Joaquin Phoenix gave a performance for the ages. Dark, disturbing, and hauntingly human.", date: "2024-02-14" }
    ],
    m007: [
      { id: "r13", user: "DuneHead", avatar: "D", rating: 10, text: "Denis Villeneuve is the greatest director working today. Part Two is a visual and emotional tsunami.", date: "2024-03-15" },
      { id: "r14", user: "SciFilover", avatar: "S", rating: 9, text: "Zendaya owns this film. The Arrakis sequences are some of the most beautiful images ever put on screen.", date: "2024-03-20" }
    ],
    s001: [
      { id: "r15", user: "SeriesAddict", avatar: "S", rating: 10, text: "The greatest television series ever made. No competition. Walter White's transformation is unparalleled storytelling.", date: "2024-01-30" },
      { id: "r16", user: "TVCritic_Pro", avatar: "T", rating: 10, text: "Every season is better than the last. Bryan Cranston and Aaron Paul — two legends at their peak.", date: "2024-02-05" }
    ],
    s002: [
      { id: "r17", user: "FantasyFan", avatar: "F", rating: 9, text: "Seasons 1-4 are the greatest television ever made. The Red Wedding broke me completely.", date: "2024-01-18" }
    ],
    s003: [
      { id: "r18", user: "StrangerFan", avatar: "S", rating: 9, text: "Season 4 was absolutely stunning. The Vecna reveal, Running Up That Hill — perfect television.", date: "2024-01-22" }
    ],
    s004: [
      { id: "r19", user: "LastOfUsFan", avatar: "L", rating: 10, text: "Episode 3 (Long Long Time) is the greatest single episode of television I have ever watched. I sobbed.", date: "2024-02-28" },
      { id: "r20", user: "PedroPascalFan", avatar: "P", rating: 10, text: "Pedro Pascal and Bella Ramsey are a once-in-a-generation duo. This show is art.", date: "2024-03-10" }
    ]
  },
  genres: ["Action", "Sci-Fi", "Drama", "Horror", "Mystery", "Thriller", "Fantasy", "Romance", "Comedy", "Crime", "Historical", "Western", "Animation", "Music", "Psychological"],
  featuredSlides: ["m001","m002","m003","m004","m005","m006","m007","s001","s002","s003","s004"]
};
// Helper functions
function getAllContent() {
  return [...RFC_DATA.movies, ...RFC_DATA.series];
}
function getTrending() {
  return getAllContent().filter(x => x.isTrending);
}
function getNew() {
  return getAllContent().filter(x => x.isNew);
}
function getFeaturedSlides() {
  return RFC_DATA.featuredSlides.map(id => getAllContent().find(x => x.id === id)).filter(Boolean);
}
function getById(id) {
  return getAllContent().find(x => x.id === id);
}
function searchContent(query, genre) {
  let results = getAllContent();
  if (query) {
    const q = query.toLowerCase();
    results = results.filter(x =>
      x.title.toLowerCase().includes(q) ||
      x.genre.some(g => g.toLowerCase().includes(q)) ||
      (x.cast && x.cast.some(c => c.toLowerCase().includes(q))) ||
      x.description.toLowerCase().includes(q) ||
      (x.director && x.director.toLowerCase().includes(q)) ||
      (x.creator && x.creator.toLowerCase().includes(q))
    );
  }
  if (genre && genre !== "All") {
    results = results.filter(x => x.genre.includes(genre));
  }
  return results;
}
function getTopMovies() {
  return [...RFC_DATA.movies].sort((a,b) => b.rating - a.rating);
}
function getTopSeries() {
  return [...RFC_DATA.series].sort((a,b) => b.rating - a.rating);
}
function getReviews(id) {
  const stored = JSON.parse(localStorage.getItem("rfc_reviews") || "{}");
  const base = RFC_DATA.reviews[id] || [];
  const user = stored[id] || [];
  return [...base, ...user].sort((a,b) => new Date(b.date) - new Date(a.date));
}
function addReview(id, review) {
  const stored = JSON.parse(localStorage.getItem("rfc_reviews") || "{}");
  if (!stored[id]) stored[id] = [];
  stored[id].unshift(review);
  localStorage.setItem("rfc_reviews", JSON.stringify(stored));
}
function getAggregateRating(id) {
  const reviews = getReviews(id);
  if (!reviews.length) return getById(id)?.rating || 0;
  const sum = reviews.reduce((a, r) => a + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}
function getContentByGenre(genre) {
  return getAllContent().filter(x => x.genre.includes(genre));
}
