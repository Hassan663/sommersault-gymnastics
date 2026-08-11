import React from 'react';
import { motion } from 'framer-motion';
import { EASE } from '../../lib/motion';
import { useForm } from 'react-hook-form';
import HeroSlider from '../../components/HeroSlider';
import ClassPreview from '../../components/ClassPreview';
import { facility, people } from '../../assets/photos';
import {
  SectionHeading,
  CircleButton,
  PillButton,
  PhotoCard,
  StatCard,
  BenefitRow,
} from '../../components/ui';

const Home = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit = (data) => {
    // No backend yet — stands in for the real enrolment endpoint.
    console.log('Trial request:', data);
    reset(undefined, { keepIsSubmitted: true, keepIsSubmitSuccessful: true });
  };

  const results = [
    { value: '37', label: 'Junior rankings earned' },
    { value: '1', label: 'First adult ranking' },
    { value: '3', label: 'Second adult rankings' },
    { value: '2', label: 'Third adult rankings' },
  ];

  const benefits = [
    {
      title: 'Teamwork',
      desc: 'One of the most useful skills a child can carry into any part of adult life — learned here on the mat, together.',
    },
    {
      title: 'Real friendships',
      desc: 'Our gymnasts share goals, share the joy of a win, and learn to hold each other up. Those friendships outlast the sport.',
    },
    {
      title: 'A strong, healthy body',
      desc: 'Training develops flexibility, agility and quick reactions, builds every muscle group and shapes correct posture.',
    },
    {
      title: 'Grace and poise',
      desc: 'Gymnasts stand out — a strong figure, an easy walk, and confident, elegant movement in everything they do.',
    },
  ];

  const facts = [
    { value: 'Over 250', label: 'athletes training with us' },
    { value: 'More than 40', label: 'competitions entered, with podium finishes' },
    { value: '3', label: 'comfortable training halls, fully equipped' },
    { value: 'Up to 15', label: 'athletes per group, never more' },
  ];

  const inputClass =
    'w-full px-5 py-3 rounded-full bg-white text-sm text-ink placeholder-body/70 border-2 border-transparent focus:border-magenta focus:outline-none transition';

  return (
    <main className="bg-cream">
      <HeroSlider />

      {/* ── Learn more about the school ───────────────────────── */}
      <section className="max-w-[88rem] mx-auto px-5 sm:px-8 py-20 lg:py-28">
        <div className="max-w-3xl mb-14">
          <SectionHeading light="Learn more" bold="about our school" className="mb-6" />
          <p className="text-sm sm:text-base text-body leading-relaxed max-w-2xl">
            The idea behind our club is simple — to grow a culture of healthy living among
            children. Built with care for kids, our club teaches them to love a sport that becomes
            a real part of their lives for years to come.
          </p>
        </div>

        {/* Rotated card collage, as in the reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {facts.slice(0, 2).map((fact, i) => (
              <motion.div
                key={fact.value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                style={{ rotate: i === 0 ? '-4deg' : '3deg' }}
                className={`rounded-4xl p-6 shadow-soft ${
                  i === 0 ? 'bg-card-warm text-ink' : 'bg-magenta text-white'
                }`}
              >
                <p className="text-2xl font-extrabold mb-2">{fact.value}</p>
                <p className={`text-xs leading-snug ${i === 0 ? 'text-ink/75' : 'text-white/85'}`}>
                  {fact.label}
                </p>
              </motion.div>
            ))}
            <div className="col-span-2">
              <PhotoCard
                src={people.coachingCircle}
                alt="A coach working with a small group on the floor"
                caption="Coach and gymnast, one-to-one"
                objectPosition="60% center"
                offset="bl"
                rotate={-2}
                heightClass="h-60"
              />
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              style={{ rotate: '2deg' }}
              className="sm:col-span-2 bg-white rounded-4xl p-7 shadow-soft"
            >
              <p className="text-sm text-ink leading-relaxed">
                We work hard to keep training warm and trusting, so that every gymnast can open up
                and reach her full potential.
              </p>
            </motion.div>

            <PhotoCard
              src={facility.tinyTumblers}
              alt="The Tiny Tumblers area set up for a preschool class"
              caption="Group training session"
              offset="tr"
              rotate={-1}
              heightClass="h-64"
            />

            <div className="grid grid-cols-1 gap-4">
              {facts.slice(2).map((fact, i) => (
                <motion.div
                  key={fact.value}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-70px' }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                  style={{ rotate: i === 0 ? '3deg' : '-3deg' }}
                  className={`rounded-4xl p-6 shadow-soft ${
                    i === 0 ? 'bg-magenta text-white' : 'bg-card-warm text-ink'
                  }`}
                >
                  <p className="text-2xl font-extrabold mb-1.5">{fact.value}</p>
                  <p className={`text-xs leading-snug ${i === 0 ? 'text-white/85' : 'text-ink/75'}`}>
                    {fact.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Results ───────────────────────────────────────────── */}
      <section className="bg-shell">
        <div className="max-w-[88rem] mx-auto px-5 sm:px-8 py-20 lg:py-24">
          <SectionHeading light="Take a look at the results" bold="of our young gymnasts" />
          <p className="mt-6 mb-12 text-sm text-body leading-relaxed max-w-2xl">
            We are part of the regional gymnastics association, which lets our athletes compete for
            official rankings. We help every child travel the path from basic movement to a ranked
            competitive result.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 items-center">
            <div className="grid grid-cols-2 gap-5">
              {results.map((stat, i) => (
                <StatCard key={stat.label} value={stat.value} label={stat.label} delay={i * 0.08} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.8, ease: EASE }}
              className="media-zoom rounded-4xl overflow-hidden shadow-soft group"
            >
              <img
                src={people.teamGymnastsPosed}
                alt="The Sommersault competitive squad together"
                loading="lazy"
                className="w-full h-64 lg:h-80 object-cover"
                style={{ objectPosition: 'center 30%' }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Beyond training ───────────────────────────────────── */}
      <section className="max-w-[88rem] mx-auto px-5 sm:px-8 py-20 lg:py-28">
        <SectionHeading light="Beyond training," bold="your child gains" className="mb-14" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          <div className="space-y-10">
            <PhotoCard
              src={people.teamGymnasts}
              alt="The competitive squad on the floor"
              caption="The competitive squad"
              offset="bl"
              rotate={-3}
              heightClass="h-72"
            />
            <PhotoCard
              src={people.athleteBridge}
              alt="A gymnast holding a bridge on the floor"
              caption="Strength and flexibility"
              objectPosition="center 45%"
              offset="br"
              rotate={2}
              heightClass="h-72"
              className="lg:ml-16"
            />
          </div>

          <div className="space-y-10 lg:pt-6">
            {benefits.map((benefit, i) => (
              <BenefitRow
                key={benefit.title}
                title={benefit.title}
                desc={benefit.desc}
                delay={i * 0.08}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Programmes ────────────────────────────────────────── */}
      <section className="bg-shell">
        <div className="max-w-[88rem] mx-auto px-5 sm:px-8 py-20 lg:py-24">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <SectionHeading light="Choose the right" bold="programme for your child" />
            <PillButton to="/classes" variant="outline">
              All classes
            </PillButton>
          </div>
          <ClassPreview />
        </div>
      </section>

      {/* ── Free trial CTA + form ─────────────────────────────── */}
      <section className="max-w-[88rem] mx-auto px-5 sm:px-8 pb-24 pt-20">
        <div className="bg-cta-warm rounded-5xl px-6 py-14 sm:px-12 lg:px-16 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Heading + line-art figure */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1] mb-8">
                <span className="block font-light text-ink">We'd like to invite your child</span>
                <span className="block font-extrabold text-ink">to a free trial session</span>
              </h2>

              {/* Line-art gymnast, echoing the reference illustration */}
              <svg
                viewBox="0 0 240 300"
                className="w-56 h-72 text-magenta hidden sm:block"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {/* Gymnast in an arabesque: supporting leg down, back leg lifted,
                    torso arched, arms sweeping overhead. */}
                <circle cx="150" cy="60" r="16" />
                {/* arched torso */}
                <path d="M143 75 C126 96, 112 120, 104 146" />
                {/* leading arm sweeping up and back */}
                <path d="M140 92 C158 72, 176 50, 186 24" />
                {/* trailing arm reaching forward */}
                <path d="M136 96 C112 92, 86 82, 64 64" />
                {/* supporting leg to the floor */}
                <path d="M104 146 C100 186, 96 226, 92 262" />
                <path d="M92 262 C86 272, 78 278, 66 280" />
                {/* lifted back leg, arcing up behind */}
                <path d="M104 146 C136 156, 168 152, 194 130" />
                <path d="M194 130 C206 124, 214 116, 218 106" />
                {/* motion arc */}
                <path
                  d="M46 208 C82 246, 146 252, 200 220"
                  strokeDasharray="4 9"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Form */}
            <div>
              {isSubmitSuccessful ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-4xl p-10 text-center"
                >
                  <p className="text-xl font-extrabold text-ink mb-2">Request received</p>
                  <p className="text-sm text-body">
                    A coach will call within one business day to confirm your time.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
                  <select className={inputClass} defaultValue="" {...register('location', { required: true })}>
                    <option value="" disabled>
                      Choose a location
                    </option>
                    <option>Fitness Boulevard</option>
                    <option>Riverside Way</option>
                    <option>Halton Street</option>
                  </select>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      className={inputClass}
                      placeholder="Your name"
                      {...register('parentName', { required: true })}
                    />
                    <input
                      className={inputClass}
                      placeholder="Phone number"
                      {...register('phone', { required: true })}
                    />
                    <input
                      className={inputClass}
                      placeholder="Child's name"
                      {...register('childName', { required: true })}
                    />
                    <input
                      className={inputClass}
                      placeholder="Child's age"
                      type="number"
                      min="2"
                      max="18"
                      {...register('childAge', { required: true })}
                    />
                  </div>

                  {Object.keys(errors).length > 0 && (
                    <p className="text-xs text-magenta font-semibold px-2">
                      Please fill in every field so we can call you back.
                    </p>
                  )}

                  <fieldset className="pt-3">
                    <legend className="text-sm text-ink mb-2">
                      Has your child done sport before?
                    </legend>
                    <div className="space-y-1.5">
                      {['Yes, gymnastics', 'Yes, another sport', 'No'].map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-2.5 text-sm text-ink cursor-pointer"
                        >
                          <input
                            type="radio"
                            value={option}
                            className="text-magenta focus:ring-magenta border-ink/30"
                            {...register('experience')}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4">
                    <p className="text-[11px] leading-relaxed text-ink/70 max-w-xs">
                      By submitting this form you agree to our{' '}
                      <span className="underline text-magenta">privacy policy</span> and{' '}
                      <span className="underline text-magenta">terms of service</span>.
                    </p>
                    <CircleButton size="sm" type="submit" onClick={handleSubmit(onSubmit)}>
                      Sign up
                    </CircleButton>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
