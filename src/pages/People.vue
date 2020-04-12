<template>
    <div class="uk-text-center">
        <h1 class="we-hero-title">The People</h1>
        <p>
            Epitopes.world is made and maintained by a mult-disciplinary team of dedicated researchers developpers.
            Inovative way to freely disceminate relevant research results as fast as possible. 
        </p>
        <div class="uk-animation-fade uk-child-width-1-4@m uk-grid-small uk-grid-match" uk-grid>
            <TeamCard v-for="(field, index) in people"
                       :key="index"
                       :name="field.name"
                       :title="field.title"
                       :description="field.description"
                       :occupation="field.occupation"
                       :picture="field.picture"
            ></TeamCard>
        </div>
        <h3> Sponsors</h3>
        <div class="uk-animation-fade uk-child-width-1-4@m uk-grid-small uk-grid-match" uk-grid>
            <TeamCard v-for="(field, index) in sponsors"
                       :key="index"
                       :name="field.name"
                       :title="field.title"
                       :description="field.description"
                       :occupation="field.occupation"
                       :picture="field.picture"
            ></TeamCard>
        </div>
        <h3> Acknowledgements</h3>
        <div class="uk-animation-fade uk-child-width-1-4@m uk-grid-small uk-grid-match" uk-grid>
            <TeamCard v-for="(field, index) in thanks"
                       :key="index"
                       :name="field.name"
                       :title="field.title"
                       :description="field.description"
                       :occupation="field.occupation"
                       :picture="field.picture"
            ></TeamCard>
        </div>
        <p>
            We would like to thank all the authors who participated to this research without whom this project could not exists:
            Yahya Benslimane, Yoshua Bengio, Pierre Thibault, Rebecca Panes, Mohammed Benhamadi, François Major, Lea Harriton.
        </p>
    </div>
</template>

<script>
    import TeamCard from '../components/TeamCard'
    export default {
        name: 'People',
        components: {
            TeamCard,
        },
        data() {
          return {
            people: [
                {
                    name: "Tariq Daouda, PhD",
                    title: "Team lead, AI Research and Web Developement",
                    description: "Tariq is first author on the research paper behind Epitopes.world. He developed the network as part of his PhD thesis. He coordinates the effort and helps with the developement",
                    occupation: "Research fellow at Massachusets General Hospital / Broad Institute / Harvard Medical school",
                    picture: "img/tariq-daouda-500x521.c9b39d70.jpg"
                },
                {
                    name: "Maude Dumont-Lagacé, PhD",
                    title: "Biology Research",
                    description: "Maude is also first author on the research paper behind Epitopes.world. She takes care of the scientific writing, and makes sure that the biology is sound",
                    occupation: "Excellthera",
                    picture: "img/tariq-daouda-500x521.c9b39d70.jpg"
                },
                {
                    name: "Albert Feghaly, Msc",
                    title: "Bioinformatician",
                    description: "Albert is second author on the research paper behind Epitopes.world. Albert takes care of the data generation and bioinformatic analyses",
                    occupation: "Bioinformatician at the IRIC",
                    picture: "img/tariq-daouda-500x521.c9b39d70.jpg"
                },
                {
                    name: "Oliver Caron-Lizotte, Msc",
                    title: "Wed infrastructure",
                    description: "Olivier is an expert in cloud infrastructure deployment",
                    occupation: "CEO at Explor.ai",
                    picture: "img/tariq-daouda-500x521.c9b39d70.jpg"
                },
                {
                    name: "Antoine Zieger, Msc",
                    title: "Wed infrastructure",
                    description: "Antoine is a Big data expert and ",
                    occupation: "Big data at Ubisoft",
                    picture: "img/tariq-daouda-500x521.c9b39d70.jpg"
                },
                {
                    name: "Logan Shwartz, Msc",
                    title: "Web Developement",
                    description: "Logan ",
                    occupation: "...",
                    picture: "img/tariq-daouda-500x521.c9b39d70.jpg"
                },
                {
                    name: "Walter Sobral, Msc",
                    title: "Web Developement",
                    description: "Lorem",
                    occupation: "...",
                    picture: "img/tariq-daouda-500x521.c9b39d70.jpg"
                }
        ],
        sponsors: [
            {
                name: "ArangoDB",
                title: "NoSQL database company",
                description: "ArangoDB is providing Epitopes.world with free database hosting and maintenance through their cloud solution: Arango Oasis",
                // occupation: "...",
                picture: "img/tariq-daouda-500x521.c9b39d70.jpg"
            },
            {
                name: "Digital Ocean",
                title: "Cloud service company",
                description: "Digital Ocean is providing Epitopes.world with free cloud hosting",
                // occupation: "...",
                picture: "img/tariq-daouda-500x521.c9b39d70.jpg"
            },
            {
                name: "Explor.ai",
                title: "Machine learning deployment company",
                description: "Explor.ai is providing Epitopes.world with their expertise in effective cloud deployment",
                // occupation: "...",
                picture: "img/tariq-daouda-500x521.c9b39d70.jpg"
            }
        ],
        thanks: [
            {
                name: "Claude Perreault, MD",
                // title: "Principal investigator at the IRIC",
                description: "Claude supervised Tariq, Maude during their PhD",
                occupation: "...",
                picture: "img/tariq-daouda-500x521.c9b39d70.jpg"
            },
            {
                name: "Sebastien Lemieux, PhD",
                // title: "Principal investigator at the IRIC",
                description: "Sebastien co-supervised Tariq during his PhD",
                occupation: "...",
                picture: "img/tariq-daouda-500x521.c9b39d70.jpg"
            },
            {
                name: "Barbara Decelles",
                // title: "Machine learning deployment company",
                description: "Thourgh her work Barbara is dedicated to creating bridges between researcher in the greater Montrèal area. We would like to thank her for her amazing support.",
                occupation: "...",
                picture: "img/tariq-daouda-500x521.c9b39d70.jpg"
            }
        ]
      }
    }
}
</script>