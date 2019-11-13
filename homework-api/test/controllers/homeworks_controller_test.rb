require 'test_helper'

class HomeworksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @homework = homeworks(:one)
  end

  test "should get index" do
    get homeworks_url, as: :json
    assert_response :success
  end

  test "should create homework" do
    assert_difference('Homework.count') do
      post homeworks_url, params: { homework: { compleytion: @homework.compleytion, content: @homework.content, due_date: @homework.due_date } }, as: :json
    end

    assert_response 201
  end

  test "should show homework" do
    get homework_url(@homework), as: :json
    assert_response :success
  end

  test "should update homework" do
    patch homework_url(@homework), params: { homework: { compleytion: @homework.compleytion, content: @homework.content, due_date: @homework.due_date } }, as: :json
    assert_response 200
  end

  test "should destroy homework" do
    assert_difference('Homework.count', -1) do
      delete homework_url(@homework), as: :json
    end

    assert_response 204
  end
end
