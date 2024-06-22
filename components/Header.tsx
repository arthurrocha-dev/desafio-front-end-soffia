import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { ThemedView } from "./ThemedView";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { usePosts } from "@/hooks/usePosts";

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 40px 20px 15px;
  border: 1px solid gray;
`;

const HeaderTitle = styled.Text`
  font-size: 24px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  background-color: #e3e1dc;
`;

const styles = StyleSheet.create({
  linkText: {
    color: "#0562ed",
    marginLeft: 10,
  },
});

type HeaderProps = {
  title?: string;
  onSearch: (query: string) => void;
};

export default function Header({ title, onSearch }: HeaderProps) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
    if (!isSearchActive) {
      setSearchQuery("");
      onSearch("");
    }
  };

  return (
    <ThemedView>
      <HeaderContainer>
        {isSearchActive ? (
          <>
            <SearchInput
              value={searchQuery}
              onChangeText={(text) => {
                setSearchQuery(text);
                onSearch(text);
              }}
              placeholder="Buscar publicação"
              autoFocus={true}
            />
            <Text onPress={toggleSearch} style={styles.linkText}>
              Cancelar
            </Text>
          </>
        ) : (
          <>
            <HeaderTitle>{title}</HeaderTitle>
            <FontAwesome5
              name="search"
              size={30}
              color="black"
              onPress={toggleSearch}
            />
          </>
        )}
      </HeaderContainer>
    </ThemedView>
  );
}
