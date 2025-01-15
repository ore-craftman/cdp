import { SignupEmail } from "../../declarations";

export default function SignupTemplate({
  firstName,
  role,
  password,
  email,
}: SignupEmail) {
  return `<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#f2f0f0] flex items-center justify-center">
<div class="w-[90%] md:w-[80%] lg:w-[700px] my-4 flex flex-col gap-6">
<!--  Header  -->
  <header class="bg-[#4CAF50] rounded-2xl flex flex-col gap-4 items-center px-4 py-6">
    <img src="https://picsum.photos/200/300" alt="logo" class="w-[140px] h-[85px] object-fit" />
    <h4 class="text-center text-white font-medium text-sm max-w-[400px] w-[100%] mx-auto">Welcome to Community Development Programme Platform! Your Account Has Been Created!</h4>
  </header>

<!-- Body   -->
  <main class="text-sm bg-white rounded-2xl  p-8 pb-2">
    <h4 >Hi ${firstName},</h4>

    <h4 class="font-semibold my-4">Welcome to the Community Development Programme Platform!</h4>

    <p>We are excited to have you join us in our mission to support community-driven initiatives. This platform is designed to help track and manage community projects while providing valuable insights for informed decision-making.
    <div class="my-4"/>

    You have been added as a <b>${role}</b>

    <div class="my-4"/>
    Below are your login details
    </p>

  <ul class="list-disc ml-4">
    <li>Temporary Password: ${password}</li>
  </ul>

  <div class="my-4"/>
  <p>
    Please change your password after your first login for security purposes.
  </p>

  <div class="flex items-center justify-center my-6">
      <button class="bg-green-600 text-white  px-4 py-2 rounded-md ">
         <a href="#" >
    Sign In Now
        </a>
        </button>
    </div>

     <p>
       If you encounter any issues or need assistance, feel free to reach out to our support team at <a href="mailto:support@test.com">support@test.com</a>.
       <div class="my-10"/>
       Thank you for being part of our mission,<br/>
  <a href="#" class="font-medium text-blue-900"> Community Development Programme Platform Team</a>
      </p>


  </main>

<!--   Footer -->
  <footer class="mx-2 my-4">
    <p class="text-xs text-gray-700">
      This email was sent to ${email} because an account was created for you on the Community Development Programme Platform. If you believe this was a mistake or need further assistance, please contact our support team at <a href="mailto:support@test.com">support@test.com</a>
    </p>
  </footer>
  </div>
</body>
</html>`;
}
