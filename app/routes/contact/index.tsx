import type { Route } from './+types'
import { Form } from 'react-router'



export async function action({request}: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  const errors:Record<string, string> = {};

  if (!name) errors.name = 'Name is required';
  if (!email) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Invalid email format';
  }
  if (!subject) errors.subject = 'Subject is required';
  if (!message) errors.message = 'Message is required';

  if (Object.keys(errors).length > 0) {
    return {errors}
  };

  const data = {
    name,
    email,
    subject,
    message
  };
  return {message: 'Form submitted successfully', data}
}

const ContactPage = ({ actionData }: Route.ComponentProps) => {

  const error = actionData?.errors || {};

  return (
    <div className="max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900 rounded-sm">
        <h2 className='text-3xl font-bold text-white mb-8 text-center'>
          📬 Contact Me
        </h2>

        {actionData?.message ? (
          <p className="bg-green-700 mb-6 text-green-100 text-center rounded-lg border border-green-500 shadow-md p-4">{actionData.message}</p>
        ) : null}

        <Form method='post' className='space-y-6'>
          <div>
            <label 
              htmlFor='name'
              className='block tetx-sm font-medium text-gray-300'
            >
              Full Name
            </label>
            <input 
              type='text' 
              name='name'
              id='name' 
              className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
            />
            {error.name && <p className='text-red-600'>{error.name}</p>}
          </div>
          <div>
          <label
            htmlFor='email'
            className='block tetx-sm font-medium text-gray-300'
          >
            Email
          </label>

          <input
            type='email'
            id='email'
            name='email'
            className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
          />
          {error.email && <p className='text-red-600'>{error.email}</p>}
        </div>
        <div>
          <label
            htmlFor='subject'
            className='block tetx-sm font-medium text-gray-300'
          >
            Subject
          </label>

          <input
            type='text'
            id='subject'
            name='subject'
            className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
          />
          {error.subject && <p className='text-red-600'>{error.subject}</p>}
        </div>
        <div>
          <label
            htmlFor='message'
            className='block tetx-sm font-medium text-gray-300'
          >
            Message
          </label>

          <textarea
            id='message'
            name='message'
            className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
          />
          {error.message && <p className='text-red-600'>{error.message}</p>}
        </div>

        <button className='w-full text-white py-3 rounded-lg bg-blue-600 hover:bg-blue-700 cursor-pointer'>
          Send Message
        </button>
        </Form>


    </div>
  )
}

export default ContactPage