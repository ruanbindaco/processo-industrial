export default function IndProcess({ process }: any) {
  return (
    <div>
      <div>
        <div>
          <h2>ID: {process.id} </h2>
          Username: {process.username} <br />
          Password: {process.password}
        </div>
      </div>
      <hr></hr>
    </div>
  );
}
