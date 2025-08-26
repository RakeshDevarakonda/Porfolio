import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import aboutImg from "@/assets/about-illustration.jpg";

const About = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            About{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get to know more about who I am and what I do
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card className="p-8 bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300">
              <img
                src={aboutImg}
                alt="Developer workspace"
                className="w-full h-64 object-cover rounded-lg"
              />
            </Card>

            {/* Floating decoration */}
            <motion.div
              className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-secondary/20 blur-xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4 text-primary">
                Passionate Full-Stack Developer
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                As a fresh graduate with a strong foundation in full-stack
                development, I'm passionate about creating innovative web
                applications. My journey in software development has equipped me
                with a solid understanding of both frontend and backend
                technologies.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                I specialize in the MERN stack and have hands-on experience
                building scalable applications with modern frameworks and tools.
                I'm always eager to learn new technologies and stay updated with
                the latest industry trends.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "Languages", value: "JavaScript, Python, PHP" },
                {
                  label: "Frontend",
                  value:
                    "React.js, Next.js, Redux, React Query, HTML, CSS, Bootstrap, jQuery",
                },
                { label: "Backend", value: "Node.js, Express.js" },
                { label: "Database", value: "MongoDB, MySQL, Redis" },
                {
                  label: "Tools & DevOps",
                  value: "Git, GitHub, Docker, GitHub Actions, CI/CD",
                },
                { label: "Testing", value: "Jest, Supertest" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300"
                >
                  <h4 className="font-semibold text-primary mb-1">
                    {item.label}
                  </h4>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
