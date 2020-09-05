import React from "react";
import moment from "moment";
import swal from "sweetalert";
import axios from "axios";

const Bookings = (props) => {
    const cancelBooking = async (bid, location) => {
        const cancelReservation = await swal({
            title: "Really Cancel?",
            text: `Are you sure you want to cancel you trip to ${location}?`,
            icon: "warning",
            buttons: true,
        });
        if (cancelReservation) {
            const url = `${process.env.REACT_APP_API_URL}/reservation/cancel`;
            const data = {
                token: props.token,
                bid,
            };
            const response = await axios.post(url, data);

            if (response.data.msg === "cancelled") {
                swal({
                    title: "Reservation Cancelled!",
                    text: `Your reservation to ${location} has been cancelled.`,
                    icon: "success",
                });
            } else {
                swal({
                    title: "Whoa...",
                    text: `Something went wrong there. Please contact customer service.`,
                    icon: "error",
                });
            }
        }
    };

    const bookings = props.bookings.map((booking) => {
        const dates = `${moment(booking.checkIn).format("MMM Do")} - ${moment(
            booking.checkOut
        ).format("MMM Do YYYY")}`;

        return (
            <tr key={booking.id} className="booking-row">
                <td>
                    {booking.status === "confirmed" && props.type === "past"
                        ? "complete"
                        : booking.status}
                </td>
                <td>
                    <div className="booking-detail">{dates}</div>
                    <div className="booking-detail">
                        {booking.venueData.title}
                    </div>
                    <div className="booking-detail">
                        {booking.venueData.location}
                    </div>
                </td>
                <td>
                    <div className="booking-detail">
                        Confirmation #: {booking.conf}
                    </div>
                    <div className="booking-detail">
                        {booking.numberOfGuests} Guests, {booking.totalNights}{" "}
                        Nights
                    </div>
                    <div className="booking-detail">
                        ${booking.pricePerNight} per night
                    </div>
                    <div className="booking-detail">
                        ${booking.totalPrice} Total
                    </div>
                </td>
                <td>
                    <div className="booking-detail pointer">
                        Print Reservation
                    </div>
                    {props.type === "upcoming" &&
                        booking.status !== "cancelled" && (
                            <div
                                className="booking-detail pointer"
                                onClick={() =>
                                    cancelBooking(
                                        booking.id,
                                        booking.venueData.location
                                    )
                                }
                            >
                                Cancel Confirmation
                            </div>
                        )}
                </td>
            </tr>
        );
    });

    return (
        <table className="booking">
            <thead>
                <tr>
                    <th>Status</th>
                    <th>Dates and location</th>
                    <th>Details</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>{bookings}</tbody>
        </table>
    );
};

export default Bookings;
