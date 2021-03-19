import 'core-js/es/weak-set';
import 'core-js/es/string/starts-with';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Header from '../Header';
import Stats from '../HeaderSections/Stats';
import Nav from '../Nav';
import ordinal from '../../common/ordinal';
import {
  Wrapper,
  Heading,
  Main,
  Scroller,
  Content,
  Categories,
  Section,
  TopSection,
  Totals,
  Group,
  ColHeading,
} from './styles';

function PlayerReport({
  reportData,
  playerDisplayName,
  eventName,
  position,
  points,
  challengesComplete,
  totalChallenges,
  user,
  links,
  config,
}) {
  const difficultyGroups = [
    'Introductory',
    'Easy',
    'Medium',
    'Hard',
    'Extreme',
  ];

  // Sort the groups by difficulty
  const data = Object.entries(reportData).sort((a, b) => {
    if (
      difficultyGroups.findIndex(d => d === a[0]) >
      difficultyGroups.findIndex(d => d === b[0])
    ) {
      return 1;
    }

    if (
      difficultyGroups.findIndex(d => d === a[0]) <
      difficultyGroups.findIndex(d => d === b[0])
    ) {
      return -1;
    }

    return 0;
  });

  return (
    <Wrapper>
      <Header
        {...{
          title: (
            <Heading className="core-text core-text--secondary">
              <span className="core-text core-text--primary">
                {playerDisplayName}
              </span>{' '}
              - <span style={{ textTransform: 'uppercase' }}>{eventName}</span>{' '}
              performance report
            </Heading>
          ),
        }}
      >
        <Stats
          {...{
            headers: ['Position', 'Points', 'Challenges completed'],
            data: [
              ordinal(position),
              points,
              `${challengesComplete}/${totalChallenges}`,
            ],
          }}
        />
      </Header>
      <Main>
        <Scroller>
          <Content>
            {data.map(([difficulty, difficultyData]) => {
              const difficultySuccessRate =
                (difficultyData.correct_attempts /
                  difficultyData.total_challenges) *
                100;
              const totalsClasses = classNames({
                'core-text': true,
                'core-text--secondary': true,
                'core-text--positive': difficultySuccessRate >= 66,
                'core-text--warning':
                  difficultySuccessRate < 66 && difficultySuccessRate >= 33,
                'core-text--danger': difficultySuccessRate < 33,
              });
              return (
                <Group key={difficulty}>
                  <Categories>
                    <TopSection>
                      <h2 className="core-heading core-heading--quinary">
                        {difficulty}
                      </h2>
                      <ColHeading className="core-heading core-heading--senary">
                        Percentile
                      </ColHeading>
                      <ColHeading className="core-heading core-heading--senary">
                        Attempts
                      </ColHeading>
                      <ColHeading className="core-heading core-heading--senary">
                        Completed
                      </ColHeading>
                    </TopSection>
                    {Object.entries(difficultyData.categories).map(
                      ([category, categoryData]) => {
                        const successRate =
                          (categoryData.correct_attempts /
                            categoryData.total_challenges) *
                          100;

                        const classes = classNames({
                          'core-text': true,
                          'core-text--secondary': true,
                          'core-text--positive': successRate >= 66,
                          'core-text--warning':
                            successRate < 66 && successRate >= 33,
                          'core-text--danger': successRate < 33,
                        });

                        return (
                          <Section key={category}>
                            <div className="core-text core-text--primary">
                              {category}
                            </div>
                            <div className={classes}>
                              {categoryData.percentile === null
                                ? '-'
                                : Math.round(categoryData.percentile)}
                            </div>
                            <div className={classes}>
                              {categoryData.total_attempts}
                            </div>
                            <div className={classes}>
                              {categoryData.correct_attempts}/
                              {categoryData.total_challenges}
                            </div>
                            {Object.entries(categoryData.tags).map(
                              ([tag, tagData]) => (
                                <Fragment key={tag}>
                                  <div className="core-text core-text--secondary">
                                    {tag}
                                  </div>
                                  <div className="core-text core-text--secondary">
                                    {tagData.percentile === null
                                      ? '-'
                                      : Math.round(tagData.percentile)}
                                  </div>
                                  <div className="core-text core-text--secondary">
                                    {tagData.total_attempts}
                                  </div>
                                  <div className="core-text core-text--secondary">
                                    {tagData.correct_attempts}/
                                    {tagData.total_challenges}
                                  </div>
                                </Fragment>
                              )
                            )}
                          </Section>
                        );
                      }
                    )}
                  </Categories>
                  <Totals>
                    <div className="core-text core-text--primary">Total</div>
                    <div className={totalsClasses}>
                      {difficultyData.percentile === null
                        ? '-'
                        : Math.round(difficultyData.percentile)}
                    </div>
                    <div className={totalsClasses}>
                      {difficultyData.total_attempts}
                    </div>
                    <div className={totalsClasses}>
                      {difficultyData.correct_attempts}/
                      {difficultyData.total_challenges}
                    </div>
                  </Totals>
                </Group>
              );
            })}
          </Content>
        </Scroller>
      </Main>
      <Nav {...{ displayName: user.displayName, links, config }}></Nav>
    </Wrapper>
  );
}

PlayerReport.propTypes = {
  reportData: PropTypes.object,
  playerDisplayName: PropTypes.string,
  eventName: PropTypes.string,
  position: PropTypes.number,
  points: PropTypes.number,
  challengesComplete: PropTypes.number,
  totalChallenges: PropTypes.number,
  user: PropTypes.object,
  config: PropTypes.object,
  links: PropTypes.object,
};

export default PlayerReport;
