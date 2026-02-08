import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

import blogPostsData from "@site/src/data/blog-posts.json";

const socialLinks = [
  { name: "Instagram", url: "https://instagram.com/seohw112233" },
  { name: "LinkedIn", url: "www.linkedin.com/in/희원-서-73b092280" },
  { name: "Email", url: "seoheewon123@naver.com" },
];

const tags = [
  "Front end",
  "Back end",
  "Web",
  "React",
  "JavaScript",
  "TypeScript",
  "Review",
  "CSS",
];

const blogPosts = blogPostsData.slice(0, 3);

function ProfileSection() {
  return (
    <div className={styles.profileSection}>
      <img
        src="/img/favicon-96x96.png"
        alt="Profile"
        className={styles.profileImage}
      />
      <Heading as="h1" className={styles.profileName}>
        Kevin
      </Heading>

      <p className={styles.profileTitle}>Student/Developer</p>
      <div className={styles.socialLinks}>
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.name}
          </a>
        ))}
      </div>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>{`#${tag}`}</span>
        ))}
      </div>
    </div>
  );
}

function AboutMeSection() {
  return (
    <div className={styles.aboutSection}>
      <Heading as="h2">About Me</Heading>
      <p>
        컴공 입학부터 빛을 보지 못하고 혼자 도태되는 듯 했으나
        <br></br>
        스스로 행동하여 자신의 가치를 끌어올리는 것에 깨달음을 얻어
        <br></br>
        현재는 이런저런 네트워킹 행사에 참여하여 저만의 세계관을 확장하고
        있습니다.
        <hr></hr>
        현재 프론트엔드 공부를 주로 하고 있지만,
        <br></br>웹 사이트가 어떻게 돌아가는지 궁금하여 백엔드에도 관심이
        많습니다.
      </p>
    </div>
  );
}

function BlogSection() {
  return (
    <div className={styles.blogSection}>
      <div className="container">
        <div className="row">
          {blogPosts.map((post, idx) => (
            <div key={idx} className="col col--4">
              <div className={clsx("card", styles.blogCard)}>
                <div className="card__image">
                  <Link to={post.url}>
                    <img src={post.image} alt={post.title} />
                  </Link>
                </div>
                <div className="card__body">
                  <Heading as="h3">{post.title}</Heading>
                  <p>{post.description}</p>
                </div>
                <div className="card__footer">
                  <Link
                    to={post.url}
                    className="button button--primary button--block"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home(): React.ReactElement {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Kevin's personal blog about development and other things."
    >
      <main className={styles.mainContainer}>
        <ProfileSection />
        <AboutMeSection />
        <BlogSection />
      </main>
    </Layout>
  );
}
