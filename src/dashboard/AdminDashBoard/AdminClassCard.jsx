import Swal from "sweetalert2";

const AdminClassCard = ({ classData, refetc }) => {

    const { description, duration, email, image, name, insName, price, seats, status, _id } = classData;
    const refetch = refetc;
    const handleApproved = id => {
        fetch(`https://b712-summer-camp-server-side.vercel.app/class/approved/${id}`, { method: 'PATCH' }).then(res => res.json()).then(data => {
            if (data.modifiedCount) {
                refetch();
                Swal.fire({ icon: "success", title: `${name} is Approved` });
            } else {
                Swal.fire({ icon: "error", title: "something is going wrond maybe" });
            }
        })
    };
    const handleDenyed = id => {
        fetch(`https://b712-summer-camp-server-side.vercel.app/class/deny/${id}`, { method: 'PATCH' }).then(res => res.json()).then(data => {
            if (data.modifiedCount) {
                refetch();
                Swal.fire({ icon: "success", title: `${name} is denyed` });
            } else {
                Swal.fire({ icon: "error", title: "something is going wrond maybe" });
            }
        })
    };

    return (
        <div className="card card-side bg-base-100 shadow-xl w-full grid grid-cols-5">
            <figure><img className="w-72" src={image} alt={name} /></figure>
            <div className="col-span-4 grid grid-cols-4 pl-10 gap-3 justify-between items-center">
                <div>
                    <h2 className="card-title">{name}</h2>
                    <p>{description}</p>
                    <p>Course Duration: {duration} Weeks</p>
                </div>
                <div>

                    <p>Instructor: </p>
                    <h2 className="card-title">{insName}</h2>
                    <p>{email}</p>
                </div>
                <div>
                    <h2 className="card-title">Price ${price}</h2>
                    <h2 className="card-title">Available Seats: {seats}</h2>
                    <h2 className="card-title">Status: <span className="capitalize font-bold" style={status == 'pending' ? { color: 'orange' } : status == 'approved' ? { color: 'green' } : status == 'deny' ? { color: 'red' } : { color: 'black' }}>{status}</span></h2>

                </div>
                <div className="card-actions justify-end flex flex-col">
                    <button onClick={() => handleApproved(_id)} disabled={status !== 'pending' ? true : false} className="btn btn-success w-2/3 mx-auto">Approve</button>
                    <button onClick={() => handleDenyed(_id)} disabled={status !== 'pending' ? true : false} className="btn btn-error w-2/3 mx-auto">Deny</button>
                    <label htmlFor={`my_modal_${_id}`} className="btn w-2/3 btn-neutral mx-auto">Feedback</label>
                </div>
            </div>
            {/* modal */}
            {/* The button to open modal */}

            {/* Put this part before </body> tag */}
            <input type="checkbox" id={`my_modal_${_id}`} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{name}</h3>
                    <form>
                        <input type="text" className="border-2 border-red-500 bg-amber-500"/>
                        <input type="submit" value="Send" />
                    </form>
                    <div className="modal-action">
                        <label htmlFor={`my_modal_${_id}`} className="btn">Close!</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminClassCard;