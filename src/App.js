import "./App.css";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !subject || !message)
      return toast.error(
        "Please make sure to fill the email address, email subject, and message"
      );

    try {
      setLoading(true);
      const { data } = await axios.post(`/api/email`, {
        email,
        subject,
        message,
      });
      setLoading(false);
      setSubject('');
      setMessage('');
      toast.success(data.message);
    } catch (error) {
      setLoading(false);
      setSubject('');
      setMessage('');
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  return (
    <div className="App">
      <section>
        <ToastContainer position="top-center" limit={1} />
        <form onSubmit={submitHandler}>
          <h1>Send Email</h1>
          <div className="form-wrapper">
            <div>
              <label htmlFor="email">Email Address</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
              ></input>
            </div>
            <div>
              <label htmlFor="subject">Email Subject</label>
              <input
                onChange={(e) => setSubject(e.target.value)}
                type="text"
                id="subject"
              ></input>
            </div>
            <div>
              <label htmlFor="message">Message Body</label>
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                id="message"
              ></textarea>
            </div>
            <div>
              <button disabled={loading} type="submit">
                {loading ? "Sending..." : "Send Email"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default App;
