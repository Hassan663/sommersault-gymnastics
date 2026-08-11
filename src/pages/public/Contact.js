import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageHero from '../../components/PageHero';
import { facility, coaches as coachPhotos, cutouts } from '../../assets/photos';
import { EASE, useMotion } from '../../lib/motion';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faEnvelope,
  faLocationDot,
  faClock,
  faCheck,
  faMapLocationDot,
} from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  const m = useMotion();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      parentName: '',
      childName: '',
      childAge: '',
      email: '',
      phone: '',
      interest: '',
      message: '',
    },
  });

  const onSubmit = async (data) => {
    // No backend wired up yet — this stands in for the real enrollment endpoint.
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log('Trial request:', data);
    setSubmitted(true);
    reset();
  };

  const contactInfo = [
    {
      icon: faPhone,
      title: 'Phone',
      value: '(555) 123-4567',
      gradient: 'from-[#FBDCC0] to-[#F7B183]', tone: 'ink',
    },
    {
      icon: faEnvelope,
      title: 'Email',
      value: 'hello@sommersault.gym',
      gradient: 'from-[#F7B183] to-[#F0906F]', tone: 'ink',
    },
    {
      icon: faLocationDot,
      title: 'Address',
      value: '2847 Fitness Boulevard, City, State 12345',
      gradient: 'from-[#B01B5E] to-[#8E1449]', tone: 'white',
    },
    {
      icon: faClock,
      title: 'Hours',
      value: 'Mon–Fri 3:30–8:00 PM · Sat 9:00 AM–5:00 PM',
      gradient: 'from-[#FBDCC0] to-[#EFA890]', tone: 'ink',
    },
  ];

  const inputClass = (hasError) =>
    `w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
      hasError ? 'border-[#B01B5E]' : 'border-[#FBDCC0] focus:border-[#F7B183] focus:shadow-soft'
    }`;

  return (
    <div className="min-h-screen bg-cream pb-20">
      <PageHero
        lightLine="Come and see"
        boldLine="your child’s first class"
        tail="on us"
        tagline="free, no obligation"
        body="Tell us about your gymnast and we’ll find the right fit, then call within one business day to confirm a time."
        photo={cutouts.leap}
        photoAlt=""
        flip
      />

      <div className="max-w-7xl mx-auto px-4">

{/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
              whileHover={m.liftCard}
              className={`bg-gradient-to-br ${info.gradient} rounded-4xl p-6 shadow-soft ${
                info.tone === 'white' ? 'text-white' : 'text-ink'
              }`}
            >
              <FontAwesomeIcon icon={info.icon} className="text-2xl mb-4" />
              <h3 className="text-lg font-bold mb-2">{info.title}</h3>
              <p className={`text-sm ${info.tone === 'white' ? 'text-white/90' : 'text-ink/75'}`}>
                {info.value}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            className="bg-white rounded-4xl shadow-soft p-8"
          >
            <h2 className="text-2xl font-extrabold text-ink mb-6">Request Your Free Trial</h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-shell border-2 border-magenta rounded-4xl p-8 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#F7B183] flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={faCheck} className="text-ink text-xl" />
                </div>
                <p className="text-magenta font-bold text-lg mb-2">Request received!</p>
                <p className="text-magenta text-sm mb-6">
                  A coach will call within one business day to confirm your trial time.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-[#B01B5E] font-semibold underline"
                >
                  Submit another request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div>
                  <label className="block text-ink font-semibold mb-2" htmlFor="parentName">
                    Parent / Guardian Name
                  </label>
                  <input
                    id="parentName"
                    className={inputClass(errors.parentName)}
                    placeholder="Your name"
                    {...register('parentName', { required: 'Please enter your name' })}
                  />
                  {errors.parentName && (
                    <p className="text-magenta text-sm mt-1">{errors.parentName.message}</p>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-ink font-semibold mb-2" htmlFor="childName">
                      Child's Name
                    </label>
                    <input
                      id="childName"
                      className={inputClass(errors.childName)}
                      placeholder="Gymnast's name"
                      {...register('childName', { required: "Please enter your child's name" })}
                    />
                    {errors.childName && (
                      <p className="text-magenta text-sm mt-1">{errors.childName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-ink font-semibold mb-2" htmlFor="childAge">
                      Child's Age
                    </label>
                    <input
                      id="childAge"
                      type="number"
                      className={inputClass(errors.childAge)}
                      placeholder="Age"
                      {...register('childAge', {
                        required: 'Required',
                        min: { value: 2, message: 'We start at age 2' },
                        max: { value: 18, message: 'Our programs run through age 18' },
                      })}
                    />
                    {errors.childAge && (
                      <p className="text-magenta text-sm mt-1">{errors.childAge.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-ink font-semibold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={inputClass(errors.email)}
                    placeholder="you@email.com"
                    {...register('email', {
                      required: 'Please enter an email',
                      pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
                    })}
                  />
                  {errors.email && (
                    <p className="text-magenta text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-ink font-semibold mb-2" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className={inputClass(errors.phone)}
                    placeholder="(555) 123-4567"
                    {...register('phone', { required: 'Please enter a phone number' })}
                  />
                  {errors.phone && (
                    <p className="text-magenta text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-ink font-semibold mb-2" htmlFor="interest">
                    Program of Interest
                  </label>
                  <select
                    id="interest"
                    className={inputClass(errors.interest)}
                    {...register('interest', { required: 'Please choose a program' })}
                  >
                    <option value="">Select a program</option>
                    <option>Tiny Tumblers (2–4)</option>
                    <option>Beginner Gymnastics (5–8)</option>
                    <option>Intermediate Gymnastics (9–12)</option>
                    <option>Advanced Training (13+)</option>
                    <option>Tumbling &amp; Skills</option>
                    <option>Not sure yet</option>
                  </select>
                  {errors.interest && (
                    <p className="text-magenta text-sm mt-1">{errors.interest.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-ink font-semibold mb-2" htmlFor="message">
                    Anything we should know? <span className="font-normal opacity-60">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className={`${inputClass(false)} resize-none`}
                    placeholder="Previous experience, preferred days, questions..."
                    {...register('message')}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#F7B183] text-ink py-3 rounded-full font-bold text-lg hover:bg-magenta-dark transition disabled:opacity-60"
                  whileHover={isSubmitting ? undefined : m.growSlight}
                  whileTap={isSubmitting ? undefined : m.pressable}
                >
                  {isSubmitting ? 'Sending...' : 'Book My Trial Class'}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Map / Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            className="space-y-8"
          >
            <div className="media-zoom rounded-4xl h-64 overflow-hidden shadow-soft relative">
              <img
                src={facility.lobby}
                alt="The Sommersault reception and welcome area"
                loading="lazy"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 50%' }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 pt-12 pb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faMapLocationDot} className="text-white" />
                <p className="text-sm font-bold text-white">Find us at 2847 Fitness Boulevard</p>
              </div>
            </div>

            <div className="bg-shell rounded-4xl shadow-soft p-8">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={coachPhotos[5]}
                  alt=""
                  className="w-14 h-14 rounded-full object-cover shrink-0"
                  style={{ objectPosition: 'center 20%' }}
                />
                <h3 className="text-2xl font-extrabold text-ink">What Happens Next</h3>
              </div>
              <ol className="space-y-5">
                {[
                  'We call within one business day to confirm a class time.',
                  'Your gymnast joins a real class at their level — free, no obligation.',
                  'The coach recommends the best-fit program afterwards.',
                  'Enroll whenever you are ready. No contracts.',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-8 h-8 shrink-0 rounded-full bg-[#F7B183] text-ink font-bold flex items-center justify-center text-sm">
                      {i + 1}
                    </span>
                    <span className="text-body pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
