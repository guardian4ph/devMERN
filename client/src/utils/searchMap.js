import React from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 10.3272994, lng: () => 123.9431079 },
      radius: 200 * 1000,
    },
  });

  return (
    <div
      style={{ display: "block", margin: "10px 20px 20px 20px", width: "100%" }}
    >
      <Combobox
        onSelect={async address => {
          setValue(address, false);
          clearSuggestions();
          try {
            const result = await getGeocode({ address });
            const { lat, lng } = await getLatLng(result[0]);
            panTo({ lat, lng });
            // console.log(lat, lng);
            console.log("search result", result);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <ComboboxInput
          className='input'
          value={value}
          onChange={e => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder=' Search nearest landmark and tap map'
        />

        <ComboboxPopover>
          <ComboboxList>
            {/* Suggestions  */}
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
export default Search;
