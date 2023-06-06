import { Card, Text, createStyles, Table } from "@mantine/core";
import { Link } from "react-router-dom";
import { Episode, Location } from "../api/api.types";

const useStyles = createStyles((_theme) => ({
  text: {
    textDecoration: "none",
    color: "black",
  },
  hideOnMobile: {
    '@media (max-width: 768px)': {
      display: 'none',
    }
  }
}));

type TableProps = {
  data: Location[] | Episode[];
  type: "locations" | "episodes";
};

const TableComponent: React.FC<TableProps> = ({ data, type }) => {
  const { classes } = useStyles();

  
  return (
    <Card shadow="md" padding="md" radius="md" withBorder maw="80vw" mx="auto">
      <Table
        striped
        horizontalSpacing="xl"
        verticalSpacing="xs"
        fontSize="md"
        withColumnBorders
      >
        <thead>
          <tr>
            {type === "episodes" && (
              <th style={{ textAlign: "center" }} className={classes.hideOnMobile}>Episode</th>
            )}
            <th style={{ textAlign: "center" }}>Name</th>
            {type === "locations" && (
              <>
                <th style={{ textAlign: "center" }} className={classes.hideOnMobile}>Type</th>
                <th style={{ textAlign: "center" }} className={classes.hideOnMobile}>Dimension</th>
              </>
            )}
            {type === "episodes" && (
              <th style={{ textAlign: "center" }} className={classes.hideOnMobile}>Air Date</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr key={item.id}>
              {type === "episodes" && (
                <td style={{ textAlign: "center" }} className={classes.hideOnMobile}>
                  <Link to={`/${type}/${item.id}`} className={classes.text}>
                    {item.episode}
                  </Link>
                </td>
              )}
              <td style={{ textAlign: "center" }}>
                <Link to={`/${type}/${item.id}`} className={classes.text}>
                  <Text>{item.name}</Text>
                </Link>
              </td>
              {type === "locations" && (
                <>
                  <td style={{ textAlign: "center" }} className={classes.hideOnMobile}>
                    <Link to={`/${type}/${item.id}`} className={classes.text}>
                      {item.type}
                    </Link>
                  </td>
                  <td style={{ textAlign: "center" }} className={classes.hideOnMobile}>
                    <Link to={`/${type}/${item.id}`} className={classes.text}>
                      {item.dimension}
                    </Link>
                  </td>
                </>
              )}
              {type === "episodes" && (
                <td style={{ textAlign: "center" }} className={classes.hideOnMobile}>
                  <Link to={`/${type}/${item.id}`} className={classes.text}>
                    {item.air_date}
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export { TableComponent };
