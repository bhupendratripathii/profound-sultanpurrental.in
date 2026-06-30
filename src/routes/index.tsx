import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search, MapPin, IndianRupee, Home, Phone, BedDouble, Bath, Wifi, ChevronDown } from "lucide-react";

interface Room {
  id: number;
  title: string;
  description: string;
  area: string;
  locality: string;
  address: string;
  pricePerMonth: number;
  bedrooms: number;
  bathrooms: number;
  furnishing: string;
  roomType: string;
  amenities: string;
  contactName: string;
  contactPhone: string;
  available: boolean;
  imageUrl: string;
  createdAt: string;
}

const AREAS = [
  "all",
  "Civil Lines",
  "Chowk",
  "Amethi Road",
  "Dubeypur",
  "Alambagh",
  "Nawabganj",
  "Railway Colony",
  "Lambua Road",
];

const FURNISHING_LABELS: Record<string, string> = {
  all: "Any Furnishing",
  furnished: "Furnished",
  "semi-furnished": "Semi-Furnished",
  unfurnished: "Unfurnished",
};

const ROOM_TYPE_LABELS: Record<string, string> = {
  all: "Any Type",
  private: "Private Room",
  shared: "Shared Room",
  pg: "PG",
};

function RoomCard({ room }: { room: Room }) {
  const amenities = room.amenities.split(",").filter(Boolean);
  const bgColors = [
    "from-orange-400 to-amber-500",
    "from-emerald-400 to-teal-500",
    "from-blue-400 to-indigo-500",
    "from-purple-400 to-violet-500",
    "from-rose-400 to-pink-500",
    "from-cyan-400 to-sky-500",
  ];
  const color = bgColors[room.id % bgColors.length];

  return (
    <Link
      to="/rooms/$id"
      params={{ id: room.id.toString() }}
      className="block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
    >
      <div className={`h-44 bg-gradient-to-br ${color} flex items-center justify-center relative`}>
        <Home className="w-16 h-16 text-white/60" />
        <div className="absolute top-3 right-3 bg-white/90 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full capitalize">
          {room.roomType === "pg" ? "PG" : room.roomType}
        </div>
        <div className="absolute bottom-3 left-3 bg-black/40 text-white text-xs px-2 py-1 rounded-full capitalize">
          {room.furnishing}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-base leading-snug mb-1 line-clamp-1">{room.title}</h3>
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-orange-500" />
          <span className="truncate">{room.locality}, {room.area}</span>
        </div>

        <div className="flex items-center gap-3 mb-3 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <BedDouble className="w-4 h-4" />
            {room.bedrooms} Bed
          </span>
          <span className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            {room.bathrooms} Bath
          </span>
        </div>

        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {amenities.slice(0, 3).map((a) => (
              <span key={a} className="bg-orange-50 text-orange-700 text-xs px-2 py-0.5 rounded-full">{a}</span>
            ))}
            {amenities.length > 3 && (
              <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">+{amenities.length - 3}</span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100">
          <div className="flex items-baseline gap-0.5">
            <IndianRupee className="w-4 h-4 text-orange-600" />
            <span className="text-xl font-bold text-orange-600">{room.pricePerMonth.toLocaleString("en-IN")}</span>
            <span className="text-gray-400 text-sm">/mo</span>
          </div>
          <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full font-medium">Available</span>
        </div>
      </div>
    </Link>
  );
}

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeded, setSeeded] = useState(false);

  const [search, setSearch] = useState("");
  const [area, setArea] = useState("all");
  const [roomType, setRoomType] = useState("all");
  const [furnishing, setFurnishing] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  async function fetchRooms() {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (area !== "all") params.set("area", area);
    if (roomType !== "all") params.set("roomType", roomType);
    if (furnishing !== "all") params.set("furnishing", furnishing);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    const res = await fetch(`/api/rooms?${params}`);
    const data = await res.json();
    setRooms(data);
    setLoading(false);
  }

  useEffect(() => {
    async function init() {
      const res = await fetch("/api/rooms");
      const data = await res.json();
      if (data.length === 0 && !seeded) {
        await fetch("/api/seed", { method: "POST" });
        setSeeded(true);
        await fetchRooms();
      } else {
        setRooms(data);
        setLoading(false);
      }
    }
    init();
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    fetchRooms();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-gray-900 text-lg">SultanpurRental</span>
              <span className="text-orange-500 font-bold text-lg">.in</span>
            </div>
          </div>
          <div className="text-sm text-gray-500 hidden md:block">
            <MapPin className="w-4 h-4 inline mr-1 text-orange-500" />
            Sultanpur, Uttar Pradesh
          </div>
          <Link
            to="/post-room"
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            + Post Room
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3 leading-tight">
            Find Your Perfect Room in Sultanpur
          </h1>
          <p className="text-orange-100 text-base md:text-lg mb-8">
            Browse hundreds of rooms, PGs, and flats across all areas of Sultanpur, UP
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="bg-white rounded-2xl p-3 shadow-2xl flex gap-2">
            <div className="flex-1 flex items-center gap-2 px-2">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search by area, locality, or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-gray-800 placeholder-gray-400 outline-none text-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-[57px] z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap gap-2 items-center">
          <select
            value={area}
            onChange={(e) => { setArea(e.target.value); }}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 bg-white cursor-pointer focus:outline-none focus:border-orange-400"
          >
            {AREAS.map((a) => (
              <option key={a} value={a}>{a === "all" ? "All Areas" : a}</option>
            ))}
          </select>

          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 bg-white cursor-pointer focus:outline-none focus:border-orange-400"
          >
            {Object.entries(ROOM_TYPE_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>

          <select
            value={furnishing}
            onChange={(e) => setFurnishing(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 bg-white cursor-pointer focus:outline-none focus:border-orange-400"
          >
            {Object.entries(FURNISHING_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>

          <div className="flex items-center gap-1">
            <span className="text-gray-400 text-sm">₹</span>
            <input
              type="number"
              placeholder="Min price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-24 focus:outline-none focus:border-orange-400"
            />
            <span className="text-gray-400">–</span>
            <input
              type="number"
              placeholder="Max price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-24 focus:outline-none focus:border-orange-400"
            />
          </div>

          <button
            onClick={fetchRooms}
            className="bg-orange-500 text-white text-sm font-semibold px-4 py-1.5 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Apply
          </button>

          <button
            onClick={() => {
              setSearch(""); setArea("all"); setRoomType("all");
              setFurnishing("all"); setMinPrice(""); setMaxPrice("");
              setTimeout(fetchRooms, 0);
            }}
            className="text-gray-500 text-sm px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Listings */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-800">
            {loading ? "Loading..." : `${rooms.length} Room${rooms.length !== 1 ? "s" : ""} Found`}
          </h2>
          <span className="text-sm text-gray-400">Sultanpur, UP</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
                <div className="h-44 bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : rooms.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <Home className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">No rooms found</p>
            <p className="text-sm mt-1">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 text-center text-sm py-6 mt-12">
        <p className="font-medium text-white mb-1">SultanpurRental.in</p>
        <p>Room Rental Platform for Sultanpur, Uttar Pradesh</p>
        <p className="mt-2 text-xs">© 2026 SultanpurRental. All rights reserved.</p>
      </footer>
    </div>
  );
}
