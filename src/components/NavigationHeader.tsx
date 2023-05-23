import {
  createStyles,
  Header,
  Group,
  Container,
  rem,
  Text,
  Tabs,
} from "@mantine/core";

import { NavLink } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  inner: {
    height: rem(56),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: rem(5),
  },
}));

export function NavigationHeader() {
  const { classes } = useStyles();

  return (
    <Header height="4rem" mb={30}>
      <Container>
          <div className={classes.inner}>
            <NavLink to="/" className={classes.link}>
              <Text size="xl"> Rick and Morty</Text>
            </NavLink>

            <Group>
              <Tabs variant="pills" defaultValue="characters">
                <Tabs.List grow>
                  <Tabs.Tab value="characters">
                    <NavLink
                      to="/"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Characters
                    </NavLink>
                  </Tabs.Tab>
                  <Tabs.Tab value="locations">
                    <NavLink
                      to="/locations"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Locations
                    </NavLink>
                  </Tabs.Tab>
                  <Tabs.Tab value="episodes">
                    <NavLink
                      to="/episodes"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Episodes
                    </NavLink>
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs>
            </Group>
          </div>
      </Container>
    </Header>
  );
}

export default NavigationHeader;
