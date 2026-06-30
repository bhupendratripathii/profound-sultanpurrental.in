import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { MapPin, IndianRupee, BedDouble, Bath, Home, Phone, ArrowLeft, CheckCircle, Share2 } from "lucide-react";

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

export const Route = createFileRoute("/rooms/$id")({
  component: RoomDetail,
});

function RoomDetail() {
  const { id } = Route.useParams();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPhone, setShowPhone] = useState(false);

  useEffect(() => {
    fetch(`/api/rooms/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setRoom(data);
        setLoading(false);
      });
  }, [id]);

  const bgColors = [
    "from-orange-400 to-amber-500",
    "from-emerald-400 to-teal-500",
    "from-blue-400 to-indigo-500",
    "from-purple-400 to-violet-500",
    "from-rose-400 to-pink-500",
    "from-cyan-400 to-sky-500",
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <Home className="w-16 h-16 text-gray-300" />
        <p className="text-gray-500">Room not found</p>
        <Link to="/" className="text-orange-500 hover:underline">Back to listings</Link>
      </div>
    );
  }

  const amenities = room.amenities.split(",").filter(Boolean);
  const color = bgColors[room.id % bgColors.length];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="text-gray-500 hover:text-orange-500 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">SultanpurRental<span className="text-orange-500">.in</span></span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Hero Image */}
        <div className={`w-full h-64 md:h-80 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-6 relative overflow-hidden`}>
          <Home className="w-24 h-24 text-white/40" />
          <div className="absolute top-4 right-4 bg-white/90 text-gray-700 text-sm font-semibold px-3 py-1 rounded-full capitalize">
            {room.roomType === "pg" ? "PG Accommodation" : `${room.roomType} Room`}
          </div>
          {room.available && (
            <div className="absolute bottom-4 left-4 bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              Available Now
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-5">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">{room.title}</h1>
              <div className="flex items-center gap-1 text-gray-500">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>{room.address || `${room.locality}, ${room.area}, Sultanpur`}</span>
              </div>
            </div>

            {/* Key Details */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
                <BedDouble className="w-5 h-5 mx-auto mb-1 text-orange-500" />
                <div className="font-bold text-gray-800">{room.bedrooms}</div>
                <div className="text-xs text-gray-400">Bedroom{room.bedrooms > 1 ? "s" : ""}</div>
              </div>
              <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
                <Bath className="w-5 h-5 mx-auto mb-1 text-orange-500" />
                <div className="font-bold text-gray-800">{room.bathrooms}</div>
                <div className="text-xs text-gray-400">Bathroom{room.bathrooms > 1 ? "s" : ""}</div>
              </div>
              <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
                <Home className="w-5 h-5 mx-auto mb-1 text-orange-500" />
                <div className="font-bold text-gray-800 text-sm capitalize">{room.furnishing.replace("-", " ")}</div>
                <div className="text-xs text-gray-400">Furnishing</div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-800 mb-2">About this Room</h2>
              <p className="text-gray-600 leading-relaxed">{room.description}</p>
            </div>

            {/* Amenities */}
            {amenities.length > 0 && (
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <h2 className="font-bold text-gray-800 mb-3">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {amenities.map((a) => (
                    <span key={a} className="bg-orange-50 text-orange-700 border border-orange-100 px-3 py-1 rounded-full text-sm font-medium">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-800 mb-2">Location</h2>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex gap-2">
                  <span className="text-gray-400 w-16">Area:</span>
                  <span className="font-medium">{room.area}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-400 w-16">Locality:</span>
                  <span className="font-medium">{room.locality}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-400 w-16">City:</span>
                  <span className="font-medium">Sultanpur, Uttar Pradesh</span>
                </div>
                {room.address && (
                  <div className="flex gap-2">
                    <span className="text-gray-400 w-16">Address:</span>
                    <span className="font-medium">{room.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Price Card */}
            <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 sticky top-20">
              <div className="flex items-baseline gap-1 mb-4">
                <IndianRupee className="w-6 h-6 text-orange-600" />
                <span className="text-3xl font-extrabold text-orange-600">{room.pricePerMonth.toLocaleString("en-IN")}</span>
                <span className="text-gray-400">/month</span>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-4">
                <p className="text-sm text-gray-500 mb-1">Posted by</p>
                <p className="font-semibold text-gray-800">{room.contactName}</p>
              </div>

              {showPhone ? (
                <a
                  href={`tel:${room.contactPhone}`}
                  className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  {room.contactPhone}
                </a>
              ) : (
                <button
                  onClick={() => setShowPhone(true)}
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Show Contact
                </button>
              )}

              <a
                href={`https://wa.me/91${room.contactPhone}?text=Hi, I saw your room listing "${room.title}" on SultanpurRental.in and I am interested.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white font-bold py-3 rounded-xl transition-colors mt-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>

            <Link
              to="/"
              className="block text-center text-sm text-orange-500 hover:text-orange-600 font-medium"
            >
              ← Back to all listings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
