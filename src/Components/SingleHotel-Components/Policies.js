import React from "react";

const propertyPolicies = [
    "Guests are required to pay a 21% advance at the time of booking itself. The entire balance needs to be cleared upon arrival at the property during check-in.",
    "Our standard check-in time is 12 PM and the standard check-out time is 10 AM. Early check-in and late check-out requests are subject to availability, and may also attract an additional fee at the property's discretion.",
    "We strictly DO NOT allow a group of more than 8 people. In case of a group of 4 or more, you might be purposefully allotted different dorm rooms. Further, if the group behaviour is deemed unfit at the property, the Zostel Property Manager, upon subjective evaluation, retains the full right to take required action which may also result in an on-spot cancellation without refunds.",
    "Children below 18 years of age are not permitted entry/stay at any of our hostels, with or without guardians. We do not recommend families.",
    "We only accept a government ID as valid identification proof. No local IDs shall be accepted at the time of check-in.",
    "Guests are not permitted to bring outsiders inside the hostel campus.",
    "We believe in self-help and do not provide luggage assistance or room services.",
    "Drugs and any substance abuse is strictly banned inside and around the property.",
    "Alcohol consumption is strictly prohibited in and around the property premises.",
    "Right to admission reserved."
  ];

  const cancellationPolicy = [
    "21% advance payment is non-refundable at all times, as stated above.",
    "If you have paid any amount over this 21%, it stands applicable for a credit only if the cancellation is informed 7 days or more in advance. You will be able to avail the credited amount for any future booking at any of our properties.",
    "If informed within 7 days of the standard check-in time (12 pm), the amount shall be adjusted against the cancellation fee."
  ];

  const contactInformation = [
    "For any other queries, please reach out to us at reservations@zostel.com."
  ];

const Policies = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="collapse collapse-arrow bg-white border border-[#808080]/20">
        <input type="radio" name="my-accordion-2" checked="checked" />
        <div className="collapse-title text-xl font-medium">
          Property Policies
        </div>
        <div className="collapse-content  text-base flex flex-col gap-2">
        {propertyPolicies.map((ele) => {
            return (<p>- {ele}</p>)
          })}
        </div>
      </div>
      <div className="collapse collapse-arrow bg-white border border-[#808080]/20">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          Cancellation Policy
        </div>
        <div className="collapse-content  text-base flex flex-col gap-2">
        {cancellationPolicy.map((ele) => {
            return (<p>- {ele}</p>)
          })}
        </div>
      </div>
      <div className="collapse collapse-arrow bg-white border border-[#808080]/20">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
         Contact Information
        </div>
        <div className="collapse-content  text-base flex flex-col gap-2">
        {contactInformation.map((ele) => {
            return (<p>- {ele}</p>)
          })}
        </div>
      </div>
    </div>
  );
};

export default Policies;
