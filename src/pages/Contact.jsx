export const Contact = () => {

    const handleFormSubmit = (FormData) => {
      //console.log (FormData.entries());
       const formInputData = Object.fromEntries(FormData.entries());
       console.log(formInputData);    
    };
    return (
         <section className="section-contact">
             <h2 className="container-title">Contact Us</h2>

            <div className="contact-wrapper container">

             <form action= {handleFormSubmit}>
                 <input 
                 className="form-control"
                 type="text" 
                 required 
                 autoComplete="off" 
                 placeholder="Enter your name"
                 name="username"
                 />

                 <input 
                 className="form-control"
                 type="email" 
                 required 
                 autoComplete="false" 
                 placeholder="Enter your email"
                 name="email"
                 />

                 <textarea 
                 className="form-control"
                 required 
                 autoComplete="false" 
                 placeholder="Enter your message"
                 name="message"
                 rows="10"
                 > </textarea>

                 <button type="submit" value="send">Send</button>
             </form>
            </div>

        </section>
    );
};