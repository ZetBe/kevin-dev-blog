import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '쉬운 사용법',
    description: (
      <>
        Docusaurus를 사용하면 가장 중요한 문서에만 집중할 수 있습니다. 문서를 작성하고 마크다운 파일로 푸시하기만 하면 됩니다.
      </>
    ),
  },
  {
    title: '콘텐츠에 집중하세요',
    description: (
      <>
        Docusaurus는 당신을 위해 웹사이트를 만듭니다. 레이아웃을 재사용하여 콘텐츠를 쉽게 이동할 수 있습니다.
      </>
    ),
  },
  {
    title: 'React 기반',
    description: (
      <>
        React의 모든 기능을 활용하여 웹사이트를 확장하거나 커스터마이징하세요. Docusaurus는 재사용 가능한 컴포넌트로 확장될 수 있습니다.
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
