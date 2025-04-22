import SeatGrid from "@/components/SeatGrid";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function DashboardMaster() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);
  return (
    <div>
      {/* <Navbar /> */}
      <div className="container py-3">
        <h1 className="mb-4">Train Seat Reservation</h1>
        <SeatGrid />
      </div>
    </div>
  );
}
