import "../../App.css";
const OTPLogin = (props) => {
  const { otp, handleChange } = props;

  return (
    <div className="w-full flex justify-between items-center h-[60px]">
      <div className="container">
        <div className="row">
          <div className="col-md-4 text-center">
            <div className="row">
              <div className="col-sm-12 mt-0">
                <div action="" className="mt-0 flex justify-between ">
                  <input
                    className="rounded-xl border-[2px] border-gray-300 focus:border-primary focus:outline-none inline-block w-[50px] h-[50px] text-center"
                    type="text"
                    maxLength="1"
                    pattern="[0-9]*"
                    size="1"
                    id="digit-1"
                    key="1"
                    autoFocus
                    value={otp[0]}
                    autoComplete="off"
                    onChange={handleChange}
                  />
                  <input
                    className="rounded-xl border-[2px] border-gray-300 focus:border-primary focus:outline-none inline-block w-[50px] h-[50px] text-center"
                    type="text"
                    maxLength="1"
                    pattern="[0-9]*"
                    id="digit-2"
                    key="2"
                    size="1"
                    value={otp[1]}
                    autoComplete="off"
                    onChange={handleChange}
                  />
                  <input
                    className="rounded-xl border-[2px] border-gray-300 focus:border-primary focus:outline-none inline-block w-[50px] h-[50px] text-center"
                    type="text"
                    maxLength="3"
                    pattern="[0-9]*"
                    size="1"
                    id="digit-3"
                    key="3"
                    value={otp[2]}
                    autoComplete="off"
                    onChange={handleChange}
                  />
                  <input
                    className="rounded-xl border-[2px] border-gray-300 focus:border-primary focus:outline-none inline-block w-[50px] h-[50px] text-center"
                    type="text"
                    maxLength="1"
                    id="digit-4"
                    pattern="[0-9]*"
                    key="4"
                    size="1"
                    value={otp[3]}
                    autoComplete="off"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPLogin;
