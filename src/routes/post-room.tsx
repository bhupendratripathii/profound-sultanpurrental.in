import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Home, ArrowLeft, CheckCircle } from "lucide-react";

const AREAS = [
  "Civil Lines",
  "Chowk",
  "Amethi Road",
  "Dubeypur",
  "Alambagh",
  "Nawabganj",
  "Railway Colony",
  "Lambua Road",
  "Jagdishpur Road",
  "Pahala Road",
  "Kurwar Road",
  "Other",
];

export const Route = createFileRoute("/post-room")({
  component: PostRoom,
});

function PostRoom() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    area: "",
    locality: "",
    address: "",
    pricePerMonth: "",
    bedrooms: "1",
    bathrooms: "1",
    furnishing: "unfurnished",
    roomType: "private",
    amenities: "",
    contactName: "",
    contactPhone: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        pricePerMonth: parseInt(form.pricePerMonth),
        bedrooms: parseInt(form.bedrooms),
        bathrooms: parseInt(form.bathrooms),
        available: true,
        imageUrl: "",
      }),
    });
    if (res.ok) {
      setSubmitted(true);
    }
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900">Room Listed Successfully!</h2>
        <p className="text-gray-500">Your room has been added to SultanpurRental.in</p>
        <Link
          to="/"
          className="bg-orange-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors"
        >
          View All Listings
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
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

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900">Post Your Room</h1>
          <p className="text-gray-500 text-sm mt-1">Fill in the details to list your room on SultanpurRental.in</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Basic Info */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
            <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide">Basic Details</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Listing Title *</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="e.g. Furnished 1BHK near Civil Lines"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="Describe the room, nearby landmarks, rules, etc."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Type *</label>
                <select
                  name="roomType"
                  value={form.roomType}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400 bg-white"
                >
                  <option value="private">Private Room</option>
                  <option value="shared">Shared Room</option>
                  <option value="pg">PG</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Furnishing *</label>
                <select
                  name="furnishing"
                  value={form.furnishing}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400 bg-white"
                >
                  <option value="unfurnished">Unfurnished</option>
                  <option value="semi-furnished">Semi-Furnished</option>
                  <option value="furnished">Fully Furnished</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                <select
                  name="bedrooms"
                  value={form.bedrooms}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400 bg-white"
                >
                  {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                <select
                  name="bathrooms"
                  value={form.bathrooms}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400 bg-white"
                >
                  {[1, 2, 3].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Rent (₹) *</label>
              <input
                name="pricePerMonth"
                type="number"
                value={form.pricePerMonth}
                onChange={handleChange}
                required
                min={500}
                placeholder="e.g. 5000"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
              <input
                name="amenities"
                value={form.amenities}
                onChange={handleChange}
                placeholder="e.g. WiFi,AC,Geyser,Parking (comma separated)"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
              />
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
            <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide">Location</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Area *</label>
              <select
                name="area"
                value={form.area}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400 bg-white"
              >
                <option value="">Select area</option>
                {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Locality / Colony *</label>
              <input
                name="locality"
                value={form.locality}
                onChange={handleChange}
                required
                placeholder="e.g. Lalbagh Colony"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="e.g. Near HDFC Bank, Civil Lines, Sultanpur"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
              />
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
            <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide">Contact Details</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
              <input
                name="contactName"
                value={form.contactName}
                onChange={handleChange}
                required
                placeholder="e.g. Ramesh Sharma"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input
                name="contactPhone"
                value={form.contactPhone}
                onChange={handleChange}
                required
                type="tel"
                placeholder="e.g. 9876543210"
                pattern="[0-9]{10}"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors text-base"
          >
            {loading ? "Submitting..." : "Post My Room"}
          </button>
        </form>
      </div>
    </div>
  );
}
