{/* A1 form part b*/}
import React from "react";
import SecondaryButton from "../../components/SecondaryButton";

function A1Form_Part02() {
  const handleSubmit = (e) => {
    e.preventDefault();
   
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white m-2 sm:m-5 xl:m-8 p-4 sm:p-7 xl:p-10 rounded-lg flex flex-col gap-5"
    >
      {/* Education Qualification */}
      <div className="flex flex-col gap-4">
        <h4 className="text-lg sm:text-xl xl:text-2xl font-bold">
          4. EDUCATION QUALIFICATION
        </h4>

        {/* Year of GCE (A/L) Examination */}
        <div className="flex gap-2 items-center">
          <label className="text-sm sm:text-lg xl:text-xl font-medium ml-12">
            i. Year of the GCE (A/L) Examination :-
          </label>
          <input
            type="text"
            name="yearOfALExamination"
            className="border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black px-3 py-1 text-sm sm:text-base xl:text-lg w-[200px] sm:w-[300px] xl:w-[400px]"
          />
        </div>

        {/* Index No of GCE (A/L) Examination */}
        <div className="flex gap-2 items-center">
          <label className="text-sm sm:text-lg xl:text-xl font-medium ml-12">
            ii. Index No of the GCE (A/L) Examination :-
          </label>
          <input
            type="text"
            name="indexOfALExamination"
            className="border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black px-3 py-1 text-sm sm:text-base xl:text-lg w-[200px] sm:w-[300px] xl:w-[400px]"
          />
        </div>

        {/* Average Z Score */}
        <div className="flex gap-2 items-center">
          <label className="text-sm sm:text-lg xl:text-xl font-medium ml-12">
            iii. Average Z Score :-
          </label>
          <input
            type="text"
            name="avgZscore"
            className="border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black px-3 py-1 text-sm sm:text-base xl:text-lg w-[200px] sm:w-[300px] xl:w-[400px]"
          />
        </div>

        {/* GCE (A/L) Examination */}
        <div className="flex flex-col gap-4">
          <h5 className="text-sm sm:text-lg xl:text-xl font-medium ml-12">
            iv. GCE (A/L) Examination :-
          </h5>

          {/* Subject & Result Fields */}
          <div className="flex gap-2 items-center ml-16">
          <label className="text-sm sm:text-lg xl:text-xl font-medium ml-1">
             Subject :-
          </label>
           <input
            type="text"
            name="subject1"
            className="border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black px-3 py-1 text-sm sm:text-base xl:text-lg w-[200px] sm:w-[300px] xl:w-[400px]"
           />
         <label className="text-sm sm:text-lg xl:text-xl font-medium ml-5">
            Result :-
         </label>
         <select
           name="result1"
          className="border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black px-3 py-1 text-sm sm:text-base xl:text-lg w-[100px] sm:w-[150px] xl:w-[200px]"
         >
          <option value=""></option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="S">S</option>
          <option value="F">F</option>
        </select>
      </div>
            
     <div className="flex gap-2 items-center ml-16">
      <label className="text-sm sm:text-lg xl:text-xl font-medium ml-1">
         Subject :-
      </label>
      <input
        type="text"
        name="subject2"
        className="border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black px-3 py-1 text-sm sm:text-base xl:text-lg w-[200px] sm:w-[300px] xl:w-[400px]"
      />
      <label className="text-sm sm:text-lg xl:text-xl font-medium ml-5">
         Result :-
      </label>
       <select
        name="result2"
        className="border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black px-3 py-1 text-sm sm:text-base xl:text-lg w-[100px] sm:w-[150px] xl:w-[200px]"
       >
       <option value=""></option>
       <option value="A">A</option>
       <option value="B">B</option>
       <option value="C">C</option>
       <option value="S">S</option>
       <option value="F">F</option>
      </select>
    </div>
     <div className="flex gap-2 items-center ml-16">
     <label className="text-sm sm:text-lg xl:text-xl font-medium ml-1">
        Subject :-
     </label>
       <input
         type="text"
         name="subject3"
         className="border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black px-3 py-1 text-sm sm:text-base xl:text-lg w-[200px] sm:w-[300px] xl:w-[400px]"
       />
      <label className="text-sm sm:text-lg xl:text-xl font-medium ml-5">
          Result :-
      </label>
       <select
        name="result3"
        className="border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black px-3 py-1 text-sm sm:text-base xl:text-lg w-[100px] sm:w-[150px] xl:w-[200px]"
       >
         <option value=""></option>
         <option value="A">A</option>
         <option value="B">B</option>
         <option value="C">C</option>
         <option value="S">S</option>
         <option value="F">F</option>
       </select>
     </div>
    </div>
  </div>

  <div class="flex flex-col gap-5">
  <h4 class="text-lg sm:text-xl xl:text-2xl font-bold">
     5. DETAILS OF CITIZENSHIP
   </h4>

    {/* race */}
  <div class="flex flex-col gap-2" >
    <div class="flex items-center gap-4">
      <label class="text-sm sm:text-lg xl:text-xl font-medium ml-10">
        i. Race :-
      </label>
      <label class="flex items-center gap-1">
        <input type="radio" name="race" value="Sinhala" class="border-gray-400" />
        <span class="text-sm sm:text-base xl:text-lg font-medium">Sinhala</span>
      </label>
      <label class="flex items-center gap-1">
        <input type="radio" name="race" value="Tamil" class="border-gray-400" />
        <span class="text-sm sm:text-base xl:text-lg font-medium">Tamil</span>
      </label>
      <label class="flex items-center gap-1">
        <input type="radio" name="race" value="Muslim" class="border-gray-400" />
        <span class="text-sm sm:text-base xl:text-lg font-medium">Muslim</span>
      </label>
      <label class="flex items-center gap-1">
        <input type="radio" name="race" value="Others" class="border-gray-400" />
        <span class="text-sm sm:text-base xl:text-lg font-medium">Others</span>
      </label>
    </div>
      {/* if others */}
      <div className="flex gap-2 items-center ml-10">
      <label className="text-xs  ml-1">
         (PI specify )
      </label>
      <input
        type="text"
        name="anyother"
        className="border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black px-3 py-1 text-sm sm:text-base xl:text-lg w-[200px] sm:w-[300px] xl:w-[400px]"
      />
       </div>
  </div>

    {/* Gender */}
    <div class="flex items-center gap-4">
     <label class="text-sm sm:text-lg xl:text-xl font-medium ml-10">
       ii. Gender :-
    </label>
    <label class="flex items-center gap-1">
      <input type="radio" name="gender" value="Male" class="border-gray-400" />
      <span class="text-sm sm:text-base xl:text-lg font-medium">Male</span>
    </label>
    <label class="flex items-center gap-1">
      <input type="radio" name="gender" value="Female" class="border-gray-400" />
      <span class="text-sm sm:text-base xl:text-lg font-medium">Female</span>
    </label>
  </div>

    {/*civil status*/}
    <div class="flex items-center gap-4">
     <label class="text-sm sm:text-lg xl:text-xl font-medium ml-10">
      iii. Civil Status :-
    </label>
    <label class="flex items-center gap-1">
      <input type="radio" name="civilStatus" value="Single" class="border-gray-400" />
      <span class="text-sm sm:text-base xl:text-lg font-medium">Single</span>
    </label>
    <label class="flex items-center gap-1">
      <input type="radio" name="civilStatus" value="Married" class="border-gray-400" />
      <span class="text-sm sm:text-base xl:text-lg font-medium">Married</span>
    </label>
  </div>
  {/*religion */}
    <div className="flex gap-2 items-center">
          <label className="text-sm sm:text-lg xl:text-xl font-medium ml-10">
            iv. Religion:-
          </label>
          <input
            type="text"
            name="religion"
            className="border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black px-3 py-1 text-sm sm:text-base xl:text-lg w-[200px] sm:w-[300px] xl:w-[400px]"
          />
        </div>
        <div className="flex flex-col gap-2">
        <label htmlFor="dob" className="text-sm sm:text-lg xl:text-xl font-medium ml-10">
           v. Date of Birth :-
        </label>
        <input
         type="date"
         name="dob"
         className="border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black px-3 py-1 text-sm sm:text-base xl:text-lg w-[200px] sm:w-[300px] xl:w-[400px]"
       />
     </div>
        <div className="flex gap-2 items-center">
          <label className="text-sm sm:text-lg xl:text-xl font-medium ml-10">
            vi. Age:-
          </label>
          <input
            type="text"
            name="age"
            className="border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black px-3 py-1 text-sm sm:text-base xl:text-lg w-[200px] sm:w-[300px] xl:w-[400px]"
          />
        </div>
        {/* Citizenship */}
    <div class="flex items-center gap-4">
     <label class="text-sm sm:text-lg xl:text-xl font-medium ml-10">
       vii. Citizenship :-
    </label>
    <label class="flex items-center gap-1">
      <input type="radio" name="citizen" value="Sri Lankan" class="border-gray-400" />
      <span class="text-sm sm:text-base xl:text-lg font-medium">Sri Lankan</span>
    </label>
    <label class="flex items-center gap-1">
      <input type="radio" name="citizen" value="Foreigner" class="border-gray-400" />
      <span class="text-sm sm:text-base xl:text-lg font-medium">Foreigner</span>
    </label>
  </div> 
  <div className="flex gap-2 items-center ml-10">
      <label className="text-xs  ml-1">
         (if foreigner please mention the name of the country)
      </label>
      <input
        type="text"
        name="ifforeigner"
        className="border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black px-3 py-1 text-sm sm:text-base xl:text-lg w-[200px] sm:w-[300px] xl:w-[400px]"
      />
       </div>
       {/* if srilankan */}
    <div class="flex items-center gap-4">
     <label class="text-sm sm:text-lg xl:text-xl font-medium ml-100">
       If Sri Lankan:-
    </label>
    <label class="flex items-center gap-1">
      <input type="radio" name="srilankan" value="By Descent" class="border-gray-400" />
      <span class="text-sm sm:text-base xl:text-lg font-medium">By Descent</span>
    </label>
    <label class="flex items-center gap-1">
      <input type="radio" name="srilankan" value="By Registration" class="border-gray-400" />
      <span class="text-sm sm:text-base xl:text-lg font-medium">By Registration</span>
    </label>
  </div>  
  <div className="flex gap-8 mt-2 sm:gap-20 sm:mt-8">
            <SecondaryButton
              text="Next"
              color="bg-green-700"
              hoverColor="hover:bg-green-800"
            />
   </div>
</div>

    </form>
  );
}

export default A1Form_Part02;
