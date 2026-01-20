"use client";

import {
  Container,
  Box,
  CloseButton,
  Input,
  InputGroup,
  Card,
  HStack,
  Heading,
  Button,
  Combobox,
  Portal,
  useFilter,
  useListCollection,
  Group,
  ScrollArea,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import checkDeviceSize from "@/components/ui/breakpoints";

import { Icon } from "@/components/ui/icons/icon";
import {
  HeaderTemplate,
  PageBuilder,
} from "@/components/page-builder/template";

type BlogPost = {
  title: string;
  id: number;
  dateFull: string;
  dateY: number;
  dateM: number;
  dateD: number;
};

export default function Search() {
  //Retrieve mock data from json file
  const [searchlist, setSearchlist] = useState(null);

  const { contains } = useFilter({ sensitivity: "base" });

  // const { collection, set, filter } = useListCollection({
  //   initialItems: [],
  //   itemToString: (item) => item.title,
  //   itemToValue: (item) => item.id.toString(),
  //   filter: contains,
  // });
  // const handleInputChange = async (details: Fieldset.InputValueChangeDetails) => {
  //   const query = details.inputValue

  //   if (query.length < 2) return
  //   const response = await fetch(`/api/blog/search?q=${query}`)
  //   const data = await response.json()

  //   set(data)
  //   // Apply filter to the collection
  //   filter(details.inputValue)
  //   /////////////////
  // }

  //////////////////
  const [value, setValue] = useState("Initial value");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const notMobileDevice = checkDeviceSize();

  const endElement = value ? (
    <CloseButton
      size="xs"
      onClick={() => {
        setValue("");
        inputRef.current?.focus();
      }}
      me="-2"
    />
  ) : undefined;

  const [formData, setFormData] = useState<{
    searchQuery: string;
  }>({
    searchQuery: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  ///
  const resources = [
    { label: "Education Resources", value: "education" },
    { label: "Healthcare Resources", value: "healthcare" },
    { label: "Housing Resources", value: "housing" },
    { label: "Employment Resources", value: "employment" },
    { label: "Food Assistance", value: "food" },
    { label: "Mental Health Resources", value: "mental health" },
    { label: "Financial Aid", value: "financial aid" },
    { label: "Legal Assistance", value: "legal" },
    { label: "Childcare Resources", value: "childcare" },
    { label: "Transportation Services", value: "transportation" },
  ];
  const { collection, filter } = useListCollection({
    initialItems: resources,
    filter: contains,
  });
  const [inputValue, setInputValue] = useState("");
  const [filteredItems, setFilteredItems] = useState(resources);

  const handleSearch = () => {
    filter(inputValue); // updates the internal collection
    setFilteredItems(collection.items);
    // sync to your card table
  };

  return (
    <>
      {notMobileDevice ? (
        <>
          <PageBuilder>
            <HeaderTemplate title="Resources" imageHeight={"25vh"} />

            <Container fluid>
              <Card.Root>
                <Card.Body gap={6}>
                  <Combobox.Root collection={collection}>
                    <Combobox.Label alignSelf={"center"}>
                      <Heading>
                        Below you can search resources we have aggregated from
                        various regions.
                      </Heading>
                    </Combobox.Label>
                    <Combobox.Control>
                      <Group attached w={"full"} borderRadius={8}>
                        <Combobox.Input
                          placeholder="Select a region"
                          value={inputValue}
                          onChange={(e) => {
                            setInputValue(e.target.value);

                            setFormData({
                              ...formData,
                              searchQuery: e.target.value,
                            });
                          }}
                          w={"sm"}
                        />
                        <Combobox.Input
                          placeholder="Type to search"
                          value={inputValue}
                          onChange={(e) => {
                            setInputValue(e.target.value);

                            setFormData({
                              ...formData,
                              searchQuery: e.target.value,
                            });
                          }}
                        />
                        <Button>
                          <Icon name={"Search"} />
                        </Button>
                      </Group>

                      <Combobox.IndicatorGroup>
                        <Combobox.ClearTrigger />
                      </Combobox.IndicatorGroup>
                    </Combobox.Control>
                    <Button mt={2} onClick={handleSearch}>
                      Search
                    </Button>

                    <Portal>
                      <Combobox.Positioner>
                        <Combobox.Content>
                          <Combobox.Empty>No items found</Combobox.Empty>
                          {collection.items.map((item) => (
                            <Combobox.Item item={item} key={item.value}>
                              {item.label}
                              <Combobox.ItemIndicator />
                            </Combobox.Item>
                          ))}
                        </Combobox.Content>
                      </Combobox.Positioner>
                    </Portal>
                  </Combobox.Root>
                  {/* CARD TABLE SECTION */}

                  {/* <SimpleGrid columns={[1, 1, 1]} gap={4} mt={6}> */}
                  <Card.Root>
                    <Card.Body>
                      <ScrollArea.Root height={"md"} maxW="full">
                        <ScrollArea.Viewport>
                          <ScrollArea.Content spaceY="4" textStyle="sm">
                            {filteredItems.map((item) => (
                              <Box
                                key={item.value}
                                borderWidth="1px"
                                borderRadius="md"
                                p={4}
                                shadow="sm"
                              >
                                <strong>{item.label}</strong>
                                <Box fontSize="sm" color="gray.500">
                                  {item.value}
                                </Box>
                              </Box>
                            ))}
                          </ScrollArea.Content>
                        </ScrollArea.Viewport>
                        <ScrollArea.Scrollbar>
                          <ScrollArea.Thumb />
                        </ScrollArea.Scrollbar>
                        <ScrollArea.Corner />
                      </ScrollArea.Root>
                    </Card.Body>
                  </Card.Root>
                  {/* </SimpleGrid> */}
                </Card.Body>
              </Card.Root>
            </Container>
          </PageBuilder>

          {/* OLD SEARCH FORM */}
          {/* <Card.Root h={"md"} w={"sm"}>
                      <Stack>
                        <Fieldset.Root>
                          <Stack>
                            <Fieldset.Legend>Search</Fieldset.Legend>
                            <Fieldset.HelperText>
                              Enter your search query
                            </Fieldset.HelperText>
                          </Stack>
                          <Fieldset.Content>
                            <Field.Root>
                              <Field.Label>Search Data</Field.Label>
                              <Input type="name" />
                              <datalist></datalist>
                            </Field.Root>
                          </Fieldset.Content>
                        </Fieldset.Root>
                        <Card.Body></Card.Body>
                      </Stack>
                    </Card.Root> */}

          {/* <Fieldset.Root<BlogPost>
                    collection={collection}
                    onInputValueChange={handleInputChange}
                    onValueChange={(details) => {
                      const post = collection.items.find(item => item.id.toString() === details.value[0]);
                      if (post) setSearchlist([post])
                    }}
                  >
                    <Fieldset.Label>Search Data</Fieldset.Label>
                    <Fieldset.Control>

                      <Fieldset.Input placeholder="e.g. Educational Advancement" w={"50vw"} />
                      <Fieldset.IndicatorGroup>
                        <Fieldset.ClearTrigger />
                      </Fieldset.IndicatorGroup>

                    </Fieldset.Control>
                    <Portal>
                      <Fieldset.Positioner>
                        <Fieldset.Content>
                          <Fieldset.Empty>No items found</Fieldset.Empty>
                          <Fieldset.ItemGroup>
                            {collection.items.map((item) => (
                              <Fieldset.Item key={item.id} item={item} value={item.id.toString()}>
                                {item.title}
                              </Fieldset.Item>
                            ))}
                          </Fieldset.ItemGroup>
                        </Fieldset.Content>
                      </Fieldset.Positioner>
                    </Portal>
                  </Fieldset.Root> */}
          {/* <SimpleGrid>
                      {(searchlist ?? []).map((post) => (
                        <Box
                          key={post.id}
                          p={2}
                          borderBottom={"1px solid gray"}
                          bg={"blue"}
                          boxSize={24}
                        >
                          <Text textAlign={"left"} fontWeight={"bold"}>
                            {post.title}
                          </Text>
                          <Text
                            textAlign={"left"}
                            fontSize={"sm"}
                            color={"gray.400"}
                          >
                            {post.dateFull}
                          </Text>
                        </Box>
                      ))}
                    </SimpleGrid> */}
        </>
      ) : (
        // This is a placeholder for the mobile view to be updated later
        // Search
        <Container as={"main"} maxW={"7xl"} h={"100%"}>
          <HStack as={"section"}>
            <article>
              <Icon name="Gem" />
              {/* <GemIcon /> */}
              <Box>
                <Heading as="h3">Search</Heading>
                <InputGroup endElement={endElement}>
                  <Input
                    list={searchlist ?? ""}
                    ref={inputRef}
                    placeholder="Email"
                    value={value}
                    onChange={(e) => {
                      setValue(e.currentTarget.value);
                    }}
                  />
                </InputGroup>
              </Box>
            </article>
          </HStack>
        </Container>
      )}
    </>
  );
}
