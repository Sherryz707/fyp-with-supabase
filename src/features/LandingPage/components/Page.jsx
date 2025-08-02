import { motion } from "framer-motion";
import {
  BookOpen,
  Code,
  Cpu,
  Globe,
  Puzzle,
  Image as ImageIcon,
} from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero min-h-[60vh] bg-base-200">
        <div className="hero-content text-center max-w-4xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              AI-Powered Sign Language E-Learning Platform
            </h1>
            <p className="text-lg md:text-xl text-base-content/80 mb-6">
              A cutting-edge platform combining real-time gesture recognition,
              interactive 3D avatars, and a scalable Supabase backend to teach
              sign language effectively.
            </p>
            <a href="#overview" className="btn btn-primary">
              Explore the Project
            </a>
          </motion.div>
        </div>
      </section>

      {/* Carousel Section */}
      <section id="gallery" className="py-16 px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <ImageIcon className="w-8 h-8 text-primary" /> Project Gallery
          </h2>
          <div className="carousel carousel-center max-w-full p-4 space-x-4 bg-base-200 rounded-box">
            <div className="carousel-item">
              <img
                src="/imgs/game-2.JPG"
                alt="FYP Screenshot 1"
                className="rounded-box w-[800px] h-[400px] object-cover"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/imgs/game-png.JPG"
                alt="FYP Screenshot 2"
                className="rounded-box w-[800px] h-[400px] object-cover"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/imgs/3d-objects.JPG"
                alt="FYP Screenshot 3"
                className="rounded-box w-[800px] h-[400px] object-cover"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/imgs/room.png"
                alt="FYP Screenshot 3"
                className="rounded-box w-[800px] h-[400px] object-cover"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/imgs/1.JPG"
                alt="FYP Screenshot 4"
                className="rounded-box w-[800px] h-[400px] object-cover"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/imgs/2.JPG"
                alt="FYP Screenshot 5"
                className="rounded-box w-[800px] h-[400px] object-cover"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/imgs/3.JPG"
                alt="FYP Screenshot 6"
                className="rounded-box w-[800px] h-[400px] object-cover"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/imgs/colouring.JPG"
                alt="FYP Screenshot 6"
                className="rounded-box w-[800px] h-[400px] object-cover"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/imgs/wuiz-2.JPG"
                alt="FYP Screenshot 6"
                className="rounded-box w-[800px] h-[400px] object-cover"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/imgs/quiz-2-reaction.JPG"
                alt="FYP Screenshot 6"
                className="rounded-box w-[800px] h-[400px] object-cover"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-16 px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <BookOpen className="w-8 h-8 text-primary" /> Overview
          </h2>
          <p className="text-base md:text-lg text-base-content/80 leading-relaxed">
            For my Final Year Project, I developed an AI-powered e-learning
            platform to teach sign language using real-time gesture recognition
            and interactive 3D avatars. The system supports English ASL, Urdu
            ASL, and numerical signs, leveraging FastAI with ResNet34 for
            real-time sign classification. These predictions animate VRM
            avatars, crafted in Blender and rendered with React Three Fiber and
            Three-VRM, to provide intuitive visual feedback.
          </p>
          <p className="text-base md:text-lg text-base-content/80 leading-relaxed mt-4">
            The platform offers four interactive quiz types: Coloring the
            Alphabet, 3D Teacher with Live Camera Checking, Card Selection Quiz,
            and Sleepy Letter (requiring three correct signs to "wake" a
            letter). A Supabase backend handles authentication, content
            delivery, and progress tracking, ensuring a seamless and scalable
            learning experience.
          </p>
        </motion.div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-16 px-4 bg-base-200">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <Puzzle className="w-8 h-8 text-primary" /> Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-base-100 shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-2">
                Multilingual Sign Recognition
              </h3>
              <p className="text-base-content/80">
                Trained ResNet34 models with FastAI for accurate real-time
                classification of English ASL, Urdu ASL, and numeric signs,
                hosted on Hugging Face Spaces.
              </p>
            </div>
            <div className="card bg-base-100 shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-2">
                Interactive Quizzes
              </h3>
              <ul className="list-disc pl-5 text-base-content/80">
                <li>
                  <strong>Coloring the Alphabet:</strong> Practice signing by
                  coloring letters.
                </li>
                <li>
                  <strong>3D Teacher with Live Checking:</strong> Real-time sign
                  verification via webcam.
                </li>
                <li>
                  <strong>Card Selection Quiz:</strong> Choose the correct sign
                  from displayed cards.
                </li>
                <li>
                  <strong>Sleepy Letter:</strong> Sign correctly three times to
                  "wake" a letter.
                </li>
              </ul>
            </div>
            <div className="card bg-base-100 shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-2">3D Avatar Feedback</h3>
              <p className="text-base-content/80">
                VRM avatars, animated in Blender, respond to ML predictions for
                intuitive visual cues, enhancing learner engagement.
              </p>
            </div>
            <div className="card bg-base-100 shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Scalable Backend</h3>
              <p className="text-base-content/80">
                Supabase with PostgreSQL manages user authentication, quiz
                progress, and content APIs for a seamless experience.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Backend Section with ER Diagram */}
      <section id="backend" className="py-16 px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <Code className="w-8 h-8 text-primary" /> Backend Architecture
          </h2>
          <p className="text-base md:text-lg text-base-content/80 leading-relaxed mb-6">
            The platform leverages Supabase with PostgreSQL for robust
            authentication, content delivery, and progress tracking. The
            database schema is designed to efficiently store user data, quiz
            results, and sign language content, ensuring scalability and
            real-time updates.
          </p>
          <div className="card bg-base-100 shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">ER Diagram</h3>
            <img
              src="/imgs/er.jpeg"
              alt="ER Diagram of Supabase Database"
              className="rounded-box w-full max-w-[600px] mx-auto"
            />
            <p className="text-sm text-base-content/80 mt-4">
              The ER diagram illustrates the relationships between users,
              progress, and content tables, enabling efficient data management.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ML Model Section */}
      <section id="ml-model" className="py-16 px-4 bg-base-200">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <Cpu className="w-8 h-8 text-primary" /> Machine Learning Model
          </h2>
          <p className="text-base md:text-lg text-base-content/80 leading-relaxed mb-6">
            The core of the platform is a ResNet34 model trained with FastAI,
            hosted on Hugging Face Spaces for real-time sign classification. The
            model supports English ASL and numerical signs, delivering accurate
            predictions to drive interactive 3D avatar animations.
          </p>
          <div className="card bg-base-100 shadow-lg p-6">
            <img
              src="/imgs/hugging.png"
              alt="ML Model on Hugging Face Spaces"
              className="rounded-box w-full max-w-[600px] mx-auto"
            />
            <p className="text-sm text-base-content/80 mt-4 text-center">
              ResNet34 model hosted on{" "}
              <a
                href="https://huggingface.co/spaces/Sherryzzz/Sign-Language"
                className="link link-primary"
              >
                Hugging Face Spaces
              </a>{" "}
              for API-driven inference.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Technologies Used Section */}
      <section id="technologies" className="py-16 px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <Code className="w-8 h-8 text-primary" /> Technologies Used
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              "FastAI & ResNet34",
              "Blender",
              "React Three Fiber",
              "Three-VRM",
              "Mixamo",
              "Supabase",
              "React.js & TypeScript",
              "Gradio & Hugging Face Spaces",
            ].map((tech) => (
              <div
                key={tech}
                className="badge badge-outline badge-lg p-4 text-center"
              >
                {tech}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Challenges and Learnings Section */}
      <section id="challenges" className="py-16 px-4 bg-base-200">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <Cpu className="w-8 h-8 text-primary" /> Challenges and Learnings
          </h2>
          <p className="text-base md:text-lg text-base-content/80 leading-relaxed">
            Deploying large ResNet34 models to Hugging Face Spaces via Gradio
            presented challenges due to resource constraints and API latency.
            Animating VRM avatars with Three-VRM and custom Blender animations
            was particularly difficult, as the Three-VRM library is relatively
            new with limited online tutorials. Additionally, animating in
            Blender was a new experience for me, and mapping those animations to
            VRM characters required significant effort.
          </p>
          <p className="text-base md:text-lg text-base-content/80 leading-relaxed mt-4">
            Generalizing the model across diverse sign languages enhanced my
            skills in data augmentation and multi-class classification.
            Orchestrating ML, backend, and 3D frontend components taught me to
            design low-latency, AI-native systems for interactive education.
          </p>
        </motion.div>
      </section>

      {/* Outcome Section */}
      <section id="outcome" className="py-16 px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <Globe className="w-8 h-8 text-primary" /> Outcome
          </h2>
          <p className="text-base md:text-lg text-base-content/80 leading-relaxed">
            The result is a fully functional e-learning platform that integrates
            real-time sign language recognition with immersive 3D visuals and
            interactive quizzes. It showcases how AI, animation, and full-stack
            engineering can create meaningful educational experiences.
          </p>
          <p className="text-base md:text-lg text-base-content/80 leading-relaxed mt-4">
            This project honed my skills in applied machine learning, 3D
            animation pipelines, and cross-stack system design, demonstrating my
            ability to build scalable, AI-integrated tools for accessible sign
            language education.
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
